import { css, SerializedStyles } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'

export type AppBarProps = {
  customCss?: SerializedStyles
}

const AppBar = ({ customCss }: AppBarProps) => {
  return (
     <header css={[header]}>
       <div css={[layout, customCss]}>
        <Link to='/' css={home}>
          <h1>APAC</h1>
        </Link>
        <div css={[logInOut]}>
            <div>user</div>
            <Button customCss={button}>logout</Button>
        </div>
       </div>
     </header>
  )
}

export default AppBar

const button = css`
 font-size: 12px;
 padding: 8px 15px;
`
const home = css`
  text-decoration: none;
  border: solid 1px black;
`
const header = css`
  border: solid 1px black;
  display: flex;
  justify-content: center;
`
const layout = css`
  display: flex;
  border: solid 1px black;
`
const logInOut = css`
  border: solid 1px black;
  margin-left: auto;
  align-self: center;
  display: flex;
  width: 150px;
  justify-content: space-between;
  align-items: center;
`