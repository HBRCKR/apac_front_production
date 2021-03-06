/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import TextField from '../../../../components/TextField'
import { Phonemes, Note, FloatingButtons } from '../../components'
import { allCheck, errorpattern, header, item, row, textfield } from '../../css'
import { css } from '@emotion/react'
import { useOutletContext } from 'react-router-dom'
import { ApacContextProps } from '../../Apac'
import useSubTestRow, { SubTestRowProps } from '../../hooks/useSubTestRow'
import Button from '../../../../components/Button'

const Word = () => {
  const {
    value: { wordTest: { subTestRows, questionInformationId } },
    handleSave,
    handleSubTestChange,
    handleAllAnswerCheck,
    handleErrorPatternAnalyze,
    activateRow, focusContext: { wordTest: { focusedRow } },
    keyboardMovingEffect
  } = useOutletContext<ApacContextProps>()
  const handleChange = useMemo(() => handleSubTestChange('wordTest'), [handleSubTestChange])
  keyboardMovingEffect('wordTest')
  const activate = useMemo(() => activateRow('wordTest'), [activateRow])

  return (
    <>
      <h2>단어 검사</h2>
      <div css={[row, header, grid]}>
        <div css={[item]}>문항</div>
        <div css={[item]}>목표 단어</div>
        <div css={[item, css`gap: 5px;`]}>
          <span>아동반응</span>
          <Button customCss={allCheck} onClick={handleAllAnswerCheck('wordTest')}>+</Button>
        </div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>오류패턴</div>
        <div css={[item]}>특이사항</div>
      </div>
      {subTestRows.map((value, index) => {
        return (
          <Row
            key={value.question.number}
            value={value}
            onChange={handleChange[index]}
            questionId={questionInformationId}
            activateRow={activate[index]}
            isFocused={focusedRow === index}
          />
        )
      })}
      <FloatingButtons
        onSave={handleSave('wordTest')}
        onAnalyze={handleErrorPatternAnalyze('wordTest')}
      />
    </>
  )
}

const Row = React.memo(({ value, onChange, questionId, isFocused, activateRow }: SubTestRowProps) => {
  if (!onChange || !activateRow) return <></>
  const { question, answer, isTyping } = value
  const { handleChange, setContainerEl, reactionRef } = useSubTestRow({ value, onChange, questionId, isFocused, activateRow })
  return (
      <div key={question.number} css={[row, grid]} ref={setContainerEl}>
        <div css={[item]}>{question.number}</div>
        <div css={[item]}>{question.name}</div>
        <div css={[item]}>
          <TextField
            ref={reactionRef}
            customCss={textfield}
            label={question.target}
            value={answer.reaction}
            isPending={isTyping}
            onChange={handleChange('reaction')}
            isError={!!answer.errorMessage}
            errorMessage={answer.errorMessage}
          />
        </div>
        <div css={[item, phonemestart]}>
          <Phonemes
            value={answer.phonemes}
            onChange={handleChange('phonemes')}
            state={answer.state}
          />
        </div>
        <div css={[item]}>
        <div css={[errorpattern]}>
          {answer.totalErrorPatterns.map(({ total, errorPattern: { name } }) => {
            return `${name}(${total}회)`
          }).join(', ')}
        </div>
        </div>
        <div css={[item]}>
          <Note value={answer.note} onChange={handleChange('note')}/>
        </div>
      </div>
  )
})

export default Word

const grid = css`
display: grid;
grid-template-columns: minmax(70px, 1fr) minmax(100px, 1fr) minmax(120px, 3fr) minmax(200px, 4fr) minmax(200px, 4fr) 100px;
`
const phonemestart = css`
  justify-content: start;
  padding-left: 10%;
`
