import React from 'react'
import { Outlet } from 'react-router'
import { Global, css } from '@emotion/react'
import AppBar from './components/AppBar'
import Login from './pages/login'
import './auth/firebase'
import useUser from './hooks/useUser'
import { useAuthInitialize } from './hooks/useAuthInitialize'

const globalStyle = css`
  * {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';;
  }
  html {
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #EAEFF2;
  }
  #root {
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    min-height: 100%;
    flex-direction: column;
  }
`
function App () {
  useAuthInitialize()
  const { user } = useUser()
  return (
    <>
      <Global styles={globalStyle} />
      {
       !user
         ? <Login/>
         : <>
          <AppBar customCss={constraint} />
          <main css={[main]}>
            <div css={[constraint]}>
              {user.name && <Outlet />}
            </div>
          </main>
        </>
      }
    </>
  )
}

const constraint = css`
  padding: 0px 10px;
  width: 100%;
  @media (min-width: 1280px) {
    width: 1280px;
  }
`
const main = css`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`

export default App
