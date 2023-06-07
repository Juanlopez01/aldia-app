import React from 'react'
interface Props {
  completed: any,
  children?: any
}
const ProgressBar = ({completed, children} : Props) => {
  
    const containerStyles = {
      // height: 23,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 6,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: completed === 100 ? '#198754' : '#ffc107',
      borderRadius: 'inherit',
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          {/* {children} */}
          <span style={labelStyles}>{completed ? `${completed}%` : '0%'}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;