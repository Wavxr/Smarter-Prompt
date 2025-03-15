import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

function App() {
  const [inputPrompt, setInputPrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [mode, setMode] = useState('informational')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const modes = [
    { id: 'informational', label: 'Informational', description: 'Clear, factual responses' },
    { id: 'creative', label: 'Creative', description: 'Storytelling, idea generation' },
    { id: 'concise', label: 'Concise', description: 'Short and direct answers' },
    { id: 'persuasive', label: 'Persuasive', description: 'Convincing arguments' },
  ]

  const enhancePrompt = async () => {
    if (!inputPrompt.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
      // Update the model name to 'gemini-1.5-pro' or another available model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

      const modeInstructions = {
        informational: 'Optimize this prompt for clear, factual responses with accurate information.',
        creative: 'Enhance this prompt for creative storytelling and idea generation.',
        concise: 'Refine this prompt to get short, direct, and to-the-point answers.',
        persuasive: 'Adjust this prompt to elicit convincing arguments and persuasive content.'
      }

      const systemPrompt = `
        You are an expert prompt engineer. Your task is to enhance the following user prompt.
        ${modeInstructions[mode]}
        Make the prompt more effective while maintaining the original intent.
        Return only the enhanced prompt without explanations or additional text.
        
        Original prompt: ${inputPrompt}
      `

      const result = await model.generateContent(systemPrompt)
      const response = await result.response
      setEnhancedPrompt(response.text().trim())
    } catch (err) {
      setError(err.message || 'Failed to enhance prompt')
      console.error('Error enhancing prompt:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt)
      .then(() => {
        // Could add a toast notification here
        console.log('Copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy:', err)
      })
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Smarter Prompt</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Mode</label>
        <div className="grid grid-cols-2 gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              className={`p-2 rounded border ${
                mode === m.id ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
              onClick={() => setMode(m.id)}
            >
              <div className="font-medium">{m.label}</div>
              <div className="text-xs">{m.description}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium mb-2">
          Your Prompt
        </label>
        <textarea
          id="prompt"
          className="w-full p-2 border rounded min-h-[100px]"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
      </div>
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full disabled:opacity-50"
        onClick={enhancePrompt}
        disabled={isLoading || !inputPrompt.trim()}
      >
        {isLoading ? 'Enhancing...' : 'Enhance Prompt'}
      </button>
      
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}
      
      {enhancedPrompt && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Enhanced Prompt
            </label>
            <button
              className="text-blue-500 text-sm"
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="p-3 bg-gray-100 rounded min-h-[100px] whitespace-pre-wrap">
            {enhancedPrompt}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
