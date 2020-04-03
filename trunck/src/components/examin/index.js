import format from './utils/formatQuestion'

import {Choice,DoChoice,ErrorChoice} from './choice';
import {MultiChoice,DoMultiChoice,ErrorMultiChoice} from './multichoice';
import {Question,DoQuestion,ErrorQuestion} from './question';
import Complex from './complex';
import { HeaderContainer } from './container';

const HeaderChoice = HeaderContainer(Choice);
const HeaderMultiChoice = HeaderContainer(MultiChoice);
const HeaderQuestion = HeaderContainer(Question);
const DoHeaderChoice = HeaderContainer(DoChoice);
const DoHeaderMultiChoice = HeaderContainer(DoMultiChoice);
const DoHeaderQuestion = HeaderContainer(DoQuestion);
const ResultHeaderChoice = HeaderContainer(Choice);
const ResultHeaderMultiChoice = HeaderContainer(MultiChoice);
const ResultHeaderQuestion = HeaderContainer(Question);
const ErrorHeaderChoice = HeaderContainer(ErrorChoice);
const ErrorHeaderMultiChoice = HeaderContainer(ErrorMultiChoice);
const ErrorHeaderQuestion = HeaderContainer(ErrorQuestion);

export {
  format,
  Choice,
  MultiChoice,
  Question,
  Complex,
  DoChoice,
  DoMultiChoice,
  HeaderChoice,
  HeaderMultiChoice,
  HeaderQuestion,
  DoHeaderChoice,
  DoHeaderMultiChoice,
  DoHeaderQuestion,
  ResultHeaderChoice,
  ResultHeaderMultiChoice,
  ResultHeaderQuestion,
  ErrorHeaderChoice,
  ErrorHeaderMultiChoice,
  ErrorHeaderQuestion,
}