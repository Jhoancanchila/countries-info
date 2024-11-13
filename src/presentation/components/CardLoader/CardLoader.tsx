const CardLoading: React.FC = () => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl relative">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="skeleton h-48 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-24"></div>
        <div className="skeleton h-4 w-24"></div>
        <div className="skeleton h-4 w-20"></div>
      </div>
      <div className="skeleton h-12 w-16 absolute bottom-4 right-4"></div>
    </div>
  )
}

export default CardLoading