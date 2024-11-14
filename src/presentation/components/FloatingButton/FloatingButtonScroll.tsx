import { FC, useEffect, useState } from 'react'
import { scrollToTop } from '../../../utilities/scrollToTop/scrollToTop';

const FloatingButtonScroll:FC = () => {
  const [ showScrollButton, setShowScrollButton ] = useState(false);

  useEffect(() => {
    window.onscroll= (() => {
      const scrollTopValue = window.pageYOffset;

      if (scrollTopValue > 200) {
        setShowScrollButton(true)
      } else {
        setShowScrollButton(false)
      }
    })
  }, [showScrollButton])

  const handleScrollToTop = () => {
    scrollToTop();
  };

  return (
    <>
      {showScrollButton ?
        <div className="w-10 h-10 flex justify-center items-center fixed bottom-16 right-7">
          <button className="w-full h-full flex justify-center items-center cursor-pointer border-none rounded-[50px] bg-[#B91C1C]" onClick={handleScrollToTop}>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.226978 9.52695C-0.0699219 9.81582 -0.0763878 10.2907 0.21253 10.5875C0.501447 10.8844 0.976347 10.8908 1.27324 10.602L9.24984 2.84086L9.24984 19.5645C9.24984 19.9787 9.58567 20.3145 9.99994 20.3145C10.4142 20.3145 10.7501 19.9787 10.7501 19.5645L10.7501 2.84075L18.7268 10.602C19.0237 10.8908 19.4986 10.8844 19.7875 10.5875C20.0764 10.2907 20.0699 9.81583 19.773 9.52695L10.5231 0.52695C10.452 0.457703 10.3705 0.405381 10.2837 0.369982C10.1962 0.334185 10.1004 0.314453 9.99995 0.314453C9.83261 0.314453 9.67807 0.369239 9.55329 0.461851C9.52429 0.483375 9.4969 0.506941 9.47133 0.532338L0.226978 9.52695Z" fill="white"/>
            </svg>
          </button>
        </div>
      :
        null
      }
    </>
  )
}

export default FloatingButtonScroll