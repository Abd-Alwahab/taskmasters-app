import { FC } from 'react'

interface SkeletonProps {
  width?: number
  height?: number
  borderRadius?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

const Skeleton: FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}) => {
  const styles = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
    borderRadius: `${borderRadius}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
  }

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
      style={styles}
    >
      <div
        className="
        absolute 
        left-0 
        top-0 
        size-full
      "
      >
        <div
          className="
          absolute 
          left-0 
          top-0 
          size-full 
          origin-left
          animate-shimmer 
          bg-white
          opacity-40
        "
        ></div>
      </div>
    </div>
  )
}

export default Skeleton
