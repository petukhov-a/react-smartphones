import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="smartphone-card-wrapper"
    speed={2}
    width={1000}
    height={300}
    viewBox="0 0 900 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="203" y="13" rx="6" ry="6" width="290" height="16" /> 
    <rect x="205" y="51" rx="4" ry="4" width="134" height="11" /> 
    <rect x="205" y="92" rx="3" ry="3" width="187" height="11" /> 
    <rect x="204" y="252" rx="5" ry="5" width="214" height="11" />
    <rect x="205" y="211" rx="5" ry="5" width="225" height="11" /> 
    <rect x="204" y="133" rx="5" ry="5" width="225" height="11" /> 
    <rect x="206" y="172" rx="5" ry="5" width="172" height="11" />
    <rect x="702" y="168" rx="5" ry="5" width="151" height="37" /> 
    <rect x="3" y="14" rx="10" ry="10" width="180" height="250" /> 
    <rect x="702" y="226" rx="5" ry="5" width="151" height="37" />
  </ContentLoader>
)

export default Skeleton