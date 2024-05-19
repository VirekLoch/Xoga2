// eslint-disable-next-line react/prop-types
export const SQUARE = ({children, isSelected,updateBoard, index}) => {
    const classes = `cell ${isSelected ? 'is_selected' : ''}`;
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div className={classes} onClick={handleClick}>
        <span className='cell_content'>{children}</span>
      </div>
    )
}