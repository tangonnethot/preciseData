import format from './utils/formatQuestion'

import Choice from './choice';
import Multichoice from './multichoice';
import Question from './question';
import Complex from './complex';
import { KnowledgeContainer , HeaderContainer , StudentAnswerContainer } from './container';

const KnowledgeChoice = KnowledgeContainer(Choice);
const KnowledgeMultichoice = KnowledgeContainer(Multichoice);
const KnowledgeQuestion = KnowledgeContainer(Question);

const HeaderChoice = HeaderContainer(Choice);
const HeaderMultichoice = HeaderContainer(Multichoice);
const HeaderQuestion = HeaderContainer(Question);
const HeaderComplex = HeaderContainer(Complex);

const HeaderKnowledgeChoice = HeaderContainer(KnowledgeChoice);
const HeaderKnowledgeMultichoice = HeaderContainer(KnowledgeMultichoice);
const HeaderKnowledgeQuestion = HeaderContainer(KnowledgeQuestion);

const StudentAnswerChoice = StudentAnswerContainer(HeaderKnowledgeChoice);
const StudentAnswerMultichoice = StudentAnswerContainer(HeaderKnowledgeMultichoice);
const StudentAnswerQuestion = StudentAnswerContainer(HeaderKnowledgeQuestion);

export {
  format,
  Choice,
  Multichoice,
  Question,
  Complex,
  KnowledgeChoice,
  KnowledgeMultichoice,
  KnowledgeQuestion,
  HeaderChoice,
  HeaderMultichoice,
  HeaderQuestion,
  HeaderComplex,
  HeaderKnowledgeChoice,
  HeaderKnowledgeMultichoice,
  HeaderKnowledgeQuestion,
  StudentAnswerChoice,
  StudentAnswerMultichoice,
  StudentAnswerQuestion
}