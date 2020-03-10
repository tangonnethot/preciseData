import format from './utils/formatQuestion'

import {Choice,DoChoice} from './choice';
import {MultiChoice,DoMultiChoice} from './multichoice';
import {Question,DoQuestion} from './question';
import Complex from './complex';
import { KnowledgeContainer , HeaderContainer , StudentAnswerContainer } from './container';

// const KnowledgeChoice = KnowledgeContainer(Choice);
// const KnowledgeMultiChoice = KnowledgeContainer(MultiChoice);
// const KnowledgeQuestion = KnowledgeContainer(Question);

const HeaderChoice = HeaderContainer(Choice);
const HeaderMultiChoice = HeaderContainer(MultiChoice);
const HeaderQuestion = HeaderContainer(Question);
const DoHeaderChoice = HeaderContainer(DoChoice);
const DoHeaderMultiChoice = HeaderContainer(DoMultiChoice);
const DoHeaderQuestion = HeaderContainer(DoQuestion);
// const HeaderComplex = HeaderContainer(Complex);

// const HeaderKnowledgeChoice = HeaderContainer(KnowledgeChoice);
// const HeaderKnowledgeMultiChoice = HeaderContainer(KnowledgeMultiChoice);
// const HeaderKnowledgeQuestion = HeaderContainer(KnowledgeQuestion);

// const StudentAnswerChoice = StudentAnswerContainer(HeaderKnowledgeChoice);
// const StudentAnswerMultiChoice = StudentAnswerContainer(HeaderKnowledgeMultiChoice);
// const StudentAnswerQuestion = StudentAnswerContainer(HeaderKnowledgeQuestion);

export {
  format,
  Choice,
  MultiChoice,
  Question,
  Complex,
  DoChoice,
  DoMultiChoice,
  // KnowledgeChoice,
  // KnowledgeMultiChoice,
  // KnowledgeQuestion,
  HeaderChoice,
  HeaderMultiChoice,
  HeaderQuestion,
  DoHeaderChoice,
  DoHeaderMultiChoice,
  DoHeaderQuestion,
  // HeaderComplex,
  // HeaderKnowledgeChoice,
  // HeaderKnowledgeMultiChoice,
  // HeaderKnowledgeQuestion,
  // StudentAnswerChoice,
  // StudentAnswerMultiChoice,
  // StudentAnswerQuestion
}