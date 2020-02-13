import React, { Component } from 'react';
import './RoversController';

class RoversController extends Component {
    constructor(props){
        super(props);

        //handlers
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.state = {
          Platu:
              { 
                TopCordinates : 
                  {
                    xCoordinate:0, 
                    yCoordinate:0 
                  }, 
                  BottomCordinates : 
                  {
                    xCoordinate:0, 
                    yCoordinate:0 
                  }, 
              },
          
          Rover : {
            Position: { 
                        xCoordinate:0,
                        yCoordinate:0,
                        head:'' 
                      }
           },
           Instructions: ''
          }
          
          console.log('Initial State:' + this.state);          
    }


    handleSubmit(event) {
      
      event.preventDefault();
      if (this.validateInput())
      {
          this.setTopCoordinates();
          this.setRoversCurrentPosition();
          this.setMovingInstructions();
          this.moveRover();
      }
      
    }
    
    validateInput()
    {
      if (this._topCordinates.value === undefined || this._topCordinates.value.length !== 3 || this._topCordinates.value === null || !parseInt(this._topCordinates.value) )
      { 
        console.log('Top cordinates are worng, they should be in x y format where both are integers');
        return false;
      }
      if (this._position.value === undefined || this._position.value.length !== 5 || this._position.value === null )
      {
        console.log('rovers position specified is invalid, it should be in x y z format where x and y are coordinates and z is direction i.e. N S E or W ');
        return false;
      }
      if (!this.validateInstructions(this._instructions.value))
      {
            console.log('instructions are invalid');
            return false;
      }
      return true;
    }

    validateInstructions(instructions){
      /* TODO: Implement this.. */
      return true;
    }

    setTopCoordinates()
    {
      var nPlatu = Object.assign({}, this.state.Platu);
      nPlatu.TopCordinates.xCoordinate = parseInt(this._topCordinates.value[0]);
      nPlatu.TopCordinates.yCoordinate = parseInt(this._topCordinates.value[2]);

      this.setState({  Platu: nPlatu });
    }

    setRoversCurrentPosition()
    {
      var xCoordinate = parseInt(this._position.value[0]);
      var yCoordinate = parseInt(this._position.value[2]);
      var head = this._position.value[4];
      
      this.setState(prevState => {  
        let rover = Object.assign({}, prevState.Rover);
        rover.Position.xCoordinate = xCoordinate;
        rover.Position.yCoordinate = yCoordinate;
        rover.Position.head = head;
        });
    }

    setMovingInstructions()
    {
      this.setState({
          Instructions: this._instructions.value});
    }

    moveRover() {
      for (var i =0; i < this._instructions.value.length; i++){
             this.followInstruction( this._instructions.value.charAt(i));
      }
    }

    followInstruction(instructionCode){
      let nRover = Object.assign({}, this.state.Rover);
      if (instructionCode === 'L')
          {
            this.turnLeft(nRover);
          }
      if (instructionCode === 'R')
           { 
             nRover =  this.turnRight(nRover)
           }
      if (instructionCode === 'M')
           {
               this.move(nRover);
           }
           return nRover;
    }

    turnLeft(nRover){
      
      if (nRover.Position.head === 'N')
        nRover.Position.head = 'W';
      if (nRover.Position.head === 'W')
        nRover.Position.head = 'S';
      if (nRover.Position.head === 'S')
        nRover.Position.head = 'E';
      if (nRover.Position.head === 'E')
        nRover.Position.head = 'N';
      
      this.setState(prevState => ({
        Rover: {
                ...prevState.Rover.Position,
                head: nRover.position.head
               }
            }
        ));s
        console.log('After turning left state rover objects head is' + this.state.Rover.Position.head);
    }


    turnRight(nRover){
      if (this.state.Rover.head === 'N')
        nRover.head = 'E';
      if (this.state.Rover.head === 'E')
        nRover.head = 'S';
      if (this.state.Rover.head === 'S')
        nRover.head = 'W';
      if (this.state.Rover.head === 'W')
        nRover.head = 'N';
      //this.setState({ Rover: nRover });
      return nRover;
    }

    move(nRover){
      console.log('head:' + nRover.Position.head);
      if (nRover.Position.head === 'S')
      {
        nRover.Position.yCoordinate --;
        console.log('moving south, current position y:' + nRover.Position.yCoordinate);
      }
      else if (nRover.Position.head === 'N')
      {
        nRover.Position.yCoordinate ++;
        console.log('moving north, current position y:' + nRover.Position.yCoordinate);
      }
      if (nRover.Position.head === 'E')
      {
        nRover.Position.xCoordinate ++;
        console.log('moving east, current position x:' + nRover.Position.xCoordinate);
      }
      if (nRover.Position.head === 'W')
      {
        nRover.Position.xCoordinate --;
        console.log('moving west, current position x:' + nRover.Position.xCoordinate);
      }
      
      console.log('New Rover position:' + nRover.Position.xCoordinate + nRover.Position.yCoordinate + nRover.Position.head);
      this.setState({ Rover: nRover });

    }

    render(){

      var self = this;
        const topCordinates = <div><label><b>Top Co-ordinates:</b></label>
                              <br /> 
                              <label>X Y where both are integers seperated with space</label>
                              <br /> <input type="text" name="cordinates" ref={
                                function(el){
                                  self._topCordinates = el;
                                }
                              }></input>
                              <br />
                              <br /></div>;
        
        
        const roversPosition = <div><label><b>Enter Position: </b> </label>
                                <br />
                                <label>X Y Z format seperated with spaces</label>
                                <br /> 
                                <input type="text" name="position" ref={
                                  function(el){
                                    self._position = el;
                                  }
                                }></input>
                                </div>
        
        const instructions =  <div>
                              <br />
                              <br />
                              <label><b> Enter Instructions</b> </label>
                              <br /> 
                              <label> (Only L,R,M are allowed) </ label>
                              <br /> <input type="text" name="Instructions" ref={ 
                                function (el) {
                                  self._instructions = el;
                                }
                               }></input>
                              <br />
                              <br />
                              </div>;
        
        
        const submitButton = <div><input type= "Submit" name="Submit"></input><br />
                              <br />
                              <br /></div>;
        return(
            <div className="RoversController-form">
            <form onSubmit={this.handleSubmit} >
              {topCordinates}
              {roversPosition}
              {instructions}
              {submitButton}
            </form>
            </div>
          );
    }
}
 export default RoversController;
