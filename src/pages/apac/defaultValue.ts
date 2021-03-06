import { ApacUiState } from './types'

export const apacDefaultValue: ApacUiState = {
  updatedAt: new Date(),
  information: {
    testeeName: '',
    testeeGender: '',
    testeeAge: '',
    testeeNote: ''
  },
  wordTest: {
    questionInformationId: '',
    type: 'WORD',
    subTestRows: []
  },
  simpleSentenceTest: {
    questionInformationId: '',
    type: 'SIMPLE_SENTENCE',
    subTestRows: []
  },
  normalSentenceTest: {
    questionInformationId: '',
    type: 'NORMAL_SENTENCE',
    subTestRows: []
  }
}
