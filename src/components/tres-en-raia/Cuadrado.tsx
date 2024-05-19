export const SQUARE = ({children, updateBoard, index}: {children: React.ReactNode, updateBoard: (index: number) => void, index: number}) => {
    const classes = `cell`;
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div className={classes} onClick={handleClick}>
        <span className='cell_content'>{children}</span>
      </div>
    )
}
export const SQUARE2 = ({isSelected, children}: { isSelected: boolean, children:React.ReactNode}) => {
  const classes = `cell ${isSelected ? 'is_selected' : ''}`;

  return (
    <div className={classes}>
      <span className='cell_content'>{children}</span>
    </div>
  )
}