import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import DateInput from '../../components/DateInput'
import Pagination from '../../components/Pagination'
import useHome from './useHome'

const Home = () => {
  const { currentPage, totalPage, setCurrentPage, tests, getSearchedData } = useHome()
  const [searchName, setSearchName] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const handleSearch = () => {
    getSearchedData({ page: currentPage, testedDate: searchDate, testeeName: searchName })
  }
  return (
    <>
      <header css={[container, header]}>
        <div css={title}>
          <h2>검사 목록</h2>
        </div>
        <form css={[search]}>
          <fieldset css={[fieldset]}>
            <label>이름</label>
            <TextField customCss={nameInput} value={searchName} onChange={setSearchName} />
          </fieldset>
          <fieldset css={[fieldset]}>
            <label>검사일자</label>
            <DateInput customCss={dateInput} value={searchDate} onChange={setSearchDate} />
          </fieldset>
          <Button
            onClick={(e: any) => {
              e.preventDefault()
              handleSearch()
            }}
          >
            조회
          </Button>
        </form>
      </header>
      <main css={container}>
        <Link to="tests" css={register}>
          <Button
            customCss={css`
              padding: 10px 60px;
            `}
          >
            등록
          </Button>
        </Link>
        <div css={[row]}>
          <div css={[item]}>이름</div>
          <div css={[item]}>성별</div>
          <div css={[item]}>나이</div>
          <div css={[item]}>검사일자</div>
          <div css={[item]}>특이사항</div>
          <div css={[item]}>수정하기</div>
        </div>
        {tests.map(({ testedDate, testeeAge, testeeGender, testeeName, testeeNote, id }, key) => {
          return (
            <div key={key} css={row}>
              <div css={[item]}>{testeeName}</div>
              <div css={item}>{testeeGender}</div>
              <div css={item}>{testeeAge}</div>
              <div css={item}>{testedDate}</div>
              <div css={item}>{testeeNote}</div>
              <div css={item}>
                <Link to={`tests/${id}`}>
                  <Button customCss={modify}>수정</Button>
                </Link>
              </div>
            </div>
          )
        })}
        <footer css={[page]}>
          <Pagination
            totalPageCount={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </footer>
      </main>
    </>
  )
}

export default Home

const nameInput = css`
  width: 100px;
  height: 50px;
`
const dateInput = css`
  width: 200px;
  height: 50px;
`
const container = css`
  margin-top: 20px;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const header = css`
 box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const title = css`
  margin: 10px 0px;
  display: flex;
`
const register = css`
  margin-left: auto;
  margin-right: 20px;
  align-self: flex-end;
  margin: 10px;
  padding: 10px;
  width: 200px;
  a {
    text-decoration: none;
  }  
`
const search = css`
  display: flex;
  margin: 0;
  padding: 0;
  gap: 15px;
`
const fieldset = css`
  border: none;
  padding: 0px;
  display: flex;
  align-items: center;
  gap: 10px;
`
const row = css`
  display: grid;
  grid-template-columns: minmax(100px, 3fr) minmax(50px,1fr) minmax(100px,4fr) minmax(200px, 6fr) minmax(150px, 8fr) 100px;
  :hover {
    background-color: whitesmoke;
  }
  div {
    &:first-of-type {
      border-left-width: 2px;
    }
  }
  //검사 목록 하단
  &:last-of-type {
    div {
      :first-of-type {
        border-bottom-left-radius: 10px;
      }
      :last-of-type {
        border-bottom-right-radius: 10px;
      }
    }
  }
  //검사 목록의 header 부분
  &:first-of-type {
    div {
      background-color: #F5F9FB;
      border-top-width: 2px;
      font-weight: bold;
      color: #979DAF;
      
      :first-of-type {
        border-top-left-radius: 10px;
      }
      :last-of-type {
        border-top-right-radius: 10px;
      }
    }
  }
`
const item = css`
  border-style: solid;
  border-color: #EAEFF2;
  border-width: 0px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  color: grey;
`
const page = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`
const modify = css`
  padding: 10px 20px;
  font-size: 1rem;
`
