import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'

// ページに到達した時の挙動をテスト
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'

// apiから取得した情報をモックするために書き2つをimport
import { rest } from 'msw'
import { setupServer } from 'msw/node'
