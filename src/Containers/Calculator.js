import React, { Component } from "react";
import update from "immutability-helper";
import math from "mathjs";
import "../styles.css";
import Key from "../Components/Key";
import DeleteKey from "../Components/DeleteKey";
import Display from "../Components/Display";
import DisplayResult from "../Components/DisplayResult";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.calculateOperations = this.calculateOperations.bind(this);
    this.deleteOperations = this.deleteOperations.bind(this);
    this.deleteAllOperations = this.deleteAllOperations.bind(this);
    this.state = {
      operations: "0",
      result: 0,
      displayValue: "0",
      operatorFlag: false,
      decimalFlag: false
    };
  }
  onKeyPressed(e) {
    let text = e.currentTarget.value;
    let operations = this.state.operations;
    let operatorFlag = this.state.operatorFlag;
    if (this.state.operations.length < 21) {
      /*  this.setState(prev => ({
        operations: prev.operations + text
      }));*/
      switch (true) {
        case text === "0" ||
          text === "1" ||
          text === "2" ||
          text === "3" ||
          text === "4" ||
          text === "5" ||
          text === "6" ||
          text === "7" ||
          text === "8" ||
          text === "9":
          if (this.state.operations !== "0") {
            operations += text;
            operatorFlag = false;
          } else {
            operations = text;
          }
          break;
        case text === "+" || text === "-" || text === "*" || text === "/":
          if (!this.state.operatorFlag) {
            operations += text;
            operatorFlag = true;
            this.setState({ decimalFlag: false });
          } else {
            const newNumber = operations.slice(0, operations.length - 1);
            operations = newNumber;
            operations += text;
          }
          break;
        case text === ".":
          if (!this.state.decimalFlag) {
            operations += ".";
            this.setState({ decimalFlag: true });
          }
      }
      this.setState({ operatorFlag });
      this.setState({ operations });
    } else {
      this.maxDigitWarning();
    }
  }
  maxDigitWarning = () => {
    this.setState({
      result: "Max reached!"
    });
    setTimeout(() => this.setState({ result: 0 }), 1000);
  };
  calculateOperations = () => {
    const isOperator = /[x/+‑]/;
    const endsWithOperator = /[x+‑/]$/;

    let result = this.state.operations;
    if (result) {
      result = math.eval(result);
      result = math.format(result, { precision: 9 });
      result = String(result);
      this.setState({
        operations: [result]
      });
      this.setState({
        result: [result]
      });
      this.setState({ operatorFlag: false });
    }
  };
  deleteOperations() {
    const result = this.state.operations.slice(0, -1);
    this.setState({
      operations: result.toString()
    });
    this.setState({ decimalFlag: false });
    this.setState({ operatorFlag: false });
  }
  deleteAllOperations() {
    this.setState({
      operations: "0"
    });
    this.setState({
      operations: "0",
      result: 0,
      displayValue: "0",
      operatorFlag: false,
      decimalFlag: false
    });
  }
  render() {
    return (
      <div className="calc">
        <DisplayResult result={this.state.result} className="dispRes" />
        <Display
          id="display"
          className="disp"
          operations={this.state.operations}
        />

        <div className="butt">
          <div className="butt1">
            <Key id="seven" value="7" onKeyPressed={this.onKeyPressed} />
            <Key id="eight" value="8" onKeyPressed={this.onKeyPressed} />
            <Key id="nine" value="9" onKeyPressed={this.onKeyPressed} />
            <Key id="divide" value="/" onKeyPressed={this.onKeyPressed} />
            <Key id="four" value="4" onKeyPressed={this.onKeyPressed} />
            <Key id="five" value="5" onKeyPressed={this.onKeyPressed} />
            <Key id="six" value="6" onKeyPressed={this.onKeyPressed} />
            <Key id="multiply" value="*" onKeyPressed={this.onKeyPressed} />
            <Key id="one" value="1" onKeyPressed={this.onKeyPressed} />
            <Key id="two" value="2" onKeyPressed={this.onKeyPressed} />
            <Key id="three" value="3" onKeyPressed={this.onKeyPressed} />
            <Key id="subtract" value="-" onKeyPressed={this.onKeyPressed} />
            <Key id="decimal" value="." onKeyPressed={this.onKeyPressed} />
            <Key id="zero" value="0" onKeyPressed={this.onKeyPressed} />
            <Key
              id="equals"
              className="equal"
              value="="
              onKeyPressed={this.calculateOperations}
            />
            <Key id="add" value="+" onKeyPressed={this.onKeyPressed} />
          </div>
          <div className="butt2">
            <DeleteKey
              className="CE butt"
              value="CE"
              onKeyPressed={this.deleteOperations}
            />

            <DeleteKey
              id="clear"
              className="C butt"
              value="C"
              onKeyPressed={this.deleteAllOperations}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Calculator;
