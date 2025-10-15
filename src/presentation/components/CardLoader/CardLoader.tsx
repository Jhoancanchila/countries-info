import { useTheme } from '../../../infrastructure/context/themeProvider/themeProvider'

const CardLoading: React.FC = () => {
  const { theme } = useTheme()
  
  // Determinar si el tema actual es oscuro
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  return (
    <div className={`card card-compact shadow-xl relative ${
      isDark 
        ? 'bg-gray-800' 
        : 'bg-white'
    }`}>
      <div className="flex w-full flex-col gap-4 p-4">
        <div className={`h-48 w-full rounded-xl animate-pulse ${
          isDark 
            ? 'bg-gray-700' 
            : 'bg-gray-200'
        }`}></div>
        <div className={`h-4 w-28 rounded animate-pulse ${
          isDark 
            ? 'bg-gray-700' 
            : 'bg-gray-200'
        }`}></div>
        <div className={`h-4 w-24 rounded animate-pulse ${
          isDark 
            ? 'bg-gray-700' 
            : 'bg-gray-200'
        }`}></div>
        <div className={`h-4 w-24 rounded animate-pulse ${
          isDark 
            ? 'bg-gray-700' 
            : 'bg-gray-200'
        }`}></div>
        <div className={`h-4 w-20 rounded animate-pulse ${
          isDark 
            ? 'bg-gray-700' 
            : 'bg-gray-200'
        }`}></div>
      </div>
      <div className={`h-12 w-16 absolute bottom-4 right-4 rounded animate-pulse ${
        isDark 
          ? 'bg-gray-700' 
          : 'bg-gray-200'
      }`}></div>
    </div>
  )
}

export default CardLoading