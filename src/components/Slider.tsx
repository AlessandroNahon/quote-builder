import React, { type ReactElement, useContext } from 'react'
import { QuoteType } from '../types'
import AppContext from '../context/appContext'
import LeftArrowSvg from '../assets/left-arrow.svg'

interface Props {
  className: string
  setSliderIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  sliderIsOpen: boolean
}

export default function Slider({
  className,
  sliderIsOpen,
  setSliderIsOpen
}: Props): ReactElement {
  const { quoteList, handleSelectQuote } = useContext(AppContext)

  function selectQuote(e: React.MouseEvent<HTMLDivElement>, q: QuoteType) {
    e.preventDefault()
    handleSelectQuote(e, q)
    setSliderIsOpen(!sliderIsOpen)
  }

  return (
    <>
      <div
        className={`slider-outside ${className}`}
        onClick={() => setSliderIsOpen(!sliderIsOpen)}
      ></div>
      <div className={`slider ${className}`}>
        <div className="slider-header">
          <h2>My Quotes</h2>
          <button onClick={() => setSliderIsOpen(!sliderIsOpen)}>
            <img
              className="left-arrow"
              src={LeftArrowSvg}
              alt="files button"
              loading="eager"
            />
          </button>
        </div>

        {quoteList?.map((q: QuoteType) => (
          <div
            className="slider-item"
            key={q.id}
            onClick={(e) => selectQuote(e, q)}
          >
            {q.name}
          </div>
        ))}
      </div>
    </>
  )
}
