import React, { useEffect } from 'react'
import CodeGenerator from '../components/CodeGenerator'
import Header from '../components/Header'

const Demo = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to top on page load
  }, []);
  return (
    <div>
        <Header />
        <CodeGenerator />
    </div>
  )
}

export default Demo
