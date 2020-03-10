/* eslint-disable */
import React from 'react'

export default class Answer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        // const { userAnswers } = this.state;
        // const { topics , cTopics , sTopics } = this.props.topicModal;
        // console.log( topics )
         return(<div className={Style.questionItem} key={index}>
                {
                  item.type == 1076 && <HeaderChoice 
                                        question={format.formatQuestion1(item)}
                                        questionIndex={item.topicNo}
                                        />
                }
                {
                  item.type == 1077 && <HeaderMultiChoice 
                                        question={format.formatQuestion1(item)}
                                        questionIndex={item.topicNo}
                                        />
                }
              </div>)
         
        //   {
        //     topics && topics.map( (item,index) => {
        //       return <div className={Style.questionItem} key={index}>
        //         {
        //           item.type == 1076 && <DoHeaderChoice
        //                                 question={format.formatQuestion1(item)}
        //                                 optionClick={(ans)=>this.setState({
        //                                   userAnswers:Object.assign(userAnswers,{[index]:ans})
        //                                 })}
        //                                 userAnswer={userAnswers[index]?userAnswers[index]:''}
        //                                 questionIndex={item.topicNo}
        //                                 />
        //         }
        //         {
        //           item.type == 1077 && <DoHeaderMultiChoice 
        //                                 question={format.formatQuestion1(item)}
        //                                 optionClick={(ans)=>this.setState({
        //                                   userAnswers:Object.assign(userAnswers,{[index]:ans})
        //                                 })}
        //                                 userAnswer={userAnswers[index]?userAnswers[index]:''}
        //                                 questionIndex={item.topicNo}
        //                                 />
        //         }
        //       </div>
        //     })
        //   }
        
      }
}