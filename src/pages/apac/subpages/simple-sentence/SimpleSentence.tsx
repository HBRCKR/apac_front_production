/* eslint-disable react/display-name */
import { css } from '@emotion/react'
import React, { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import Button from '../../../../components/Button'
import TextField from '../../../../components/TextField'
import { ApacContextProps } from '../../Apac'
import { FloatingButtons, Phonemes, Note } from '../../components'
import { allCheck, errorpattern, header, item, row, textfield } from '../../css'
import useSubTestRow, { SubTestRowProps } from '../../hooks/useSubTestRow'

const SimpleSentence = () => {
  const {
    value: { simpleSentenceTest: { subTestRows: questionAnswers, questionInformationId } },
    handleSave,
    handleSubTestChange,
    handleAllAnswerCheck,
    handleErrorPatternAnalyze,
    activateRow, focusContext: { simpleSentenceTest: { focusedRow } },
    keyboardMovingEffect
  } = useOutletContext<ApacContextProps>()
  const handleChange = useMemo(() => handleSubTestChange('simpleSentenceTest'), [handleSubTestChange])
  keyboardMovingEffect('simpleSentenceTest')
  const activate = useMemo(() => activateRow('simpleSentenceTest'), [activateRow])

  return (
    <>
      <h2>문장검사 간략형</h2>
      <div css={[row, header, grid]}>
        <div css={[item]}>문항</div>
        <div css={[item, css`gap: 5px;`]}>
          <span>목표 단어, </span>
          <span>아동반응</span>
          <Button customCss={allCheck} onClick={handleAllAnswerCheck('simpleSentenceTest')}>+</Button>
          <span>,</span>
          <span>오류패턴</span>
        </div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>특이사항</div>
      </div>
      {questionAnswers.map((value, index) => {
        return (
          <Row
            questionId={questionInformationId}
            key={index}
            value={value}
            onChange={handleChange[index]}
            activateRow={activate[index]}
            isFocused={index === focusedRow}
          />
        )
      })}
      <FloatingButtons
        onSave={handleSave('simpleSentenceTest') }
        onAnalyze={handleErrorPatternAnalyze('simpleSentenceTest')}
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
        <div css={[item, css`grid-row: 1 / 3; grid-column: 1;`]}>{question.number}</div>
        <div css={[item]}>
          <div css={css`flex-grow: 1;`}>
            <div css={grid2}>
              <label css={label}>목표문장</label>
              <div css={css`padding: 10px;`}>{question.name}</div>
            </div>
            <div css={grid2}>
              <label css={label}>문장반응</label>
              <TextField
                ref={reactionRef}
                customCss={textfield}
                label={question.target}
                value={answer.reaction}
                onChange={handleChange('reaction')}
                isError={!!answer.errorMessage}
                errorMessage={answer.errorMessage}
                isPending={isTyping}
              />
            </div>
          </div>
        </div>
        <div css={[item, css`grid-column: 2 / 4; grid-row: 2 / 3;`]}>
          <div css={[grid2]}>
            <label css={label}>오류패턴</label>
          <div css={[errorpattern]}>
            {answer.totalErrorPatterns.map(({ total, errorPattern: { name } }) => {
              return `${name}(${total}회)`
            }).join(', ')}
          </div>
          </div>
        </div>
        <div css={[item, phonemestart]}>
          <Phonemes
            value={answer.phonemes}
            onChange={handleChange('phonemes')}
            state={answer.state}
          />
        </div>
        <div css={[item, css`grid-row: 1 / 3;`]}>
          <Note value={answer.note} onChange={handleChange('note')}/>
        </div>
      </div>
  )
})

export default SimpleSentence

const grid = css`
  display: grid;
  grid-template-columns: minmax(70px, 1fr) minmax(250px, 7fr) 9fr 100px;
`
const grid2 = css`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 100px auto;
`
const label = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const phonemestart = css`
  justify-content: start;
  padding-left: 10px;
`
