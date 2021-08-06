// *****************************************************************************
// Notices:
//
// Copyright ©2019, 2021 United States Government as represented by the Administrator
// of the National Aeronautics and Space Administration. All Rights Reserved.
//
// Disclaimers
//
// No Warranty: THE SUBJECT SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTY OF
// ANY KIND, EITHER EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED
// TO, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL CONFORM TO SPECIFICATIONS,
// ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
// OR FREEDOM FROM INFRINGEMENT, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL BE
// ERROR FREE, OR ANY WARRANTY THAT DOCUMENTATION, IF PROVIDED, WILL CONFORM TO
// THE SUBJECT SOFTWARE. THIS AGREEMENT DOES NOT, IN ANY MANNER, CONSTITUTE AN
// ENDORSEMENT BY GOVERNMENT AGENCY OR ANY PRIOR RECIPIENT OF ANY RESULTS,
// RESULTING DESIGNS, HARDWARE, SOFTWARE PRODUCTS OR ANY OTHER APPLICATIONS
// RESULTING FROM USE OF THE SUBJECT SOFTWARE.  FURTHER, GOVERNMENT AGENCY
// DISCLAIMS ALL WARRANTIES AND LIABILITIES REGARDING THIRD-PARTY SOFTWARE, IF
// PRESENT IN THE ORIGINAL SOFTWARE, AND DISTRIBUTES IT ''AS IS.''
//
// Waiver and Indemnity:  RECIPIENT AGREES TO WAIVE ANY AND ALL CLAIMS AGAINST
// THE UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL AS
// ANY PRIOR RECIPIENT.  IF RECIPIENT'S USE OF THE SUBJECT SOFTWARE RESULTS IN
// ANY LIABILITIES, DEMANDS, DAMAGES, EXPENSES OR LOSSES ARISING FROM SUCH USE,
// INCLUDING ANY DAMAGES FROM PRODUCTS BASED ON, OR RESULTING FROM, RECIPIENT'S
// USE OF THE SUBJECT SOFTWARE, RECIPIENT SHALL INDEMNIFY AND HOLD HARMLESS THE
// UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL AS ANY
// PRIOR RECIPIENT, TO THE EXTENT PERMITTED BY LAW.  RECIPIENT'S SOLE REMEDY FOR
// ANY SUCH MATTER SHALL BE THE IMMEDIATE, UNILATERAL TERMINATION OF THIS
// AGREEMENT.
// *****************************************************************************
const LTLSimModel =require('./LTLSimModel');
const Atomic = require('./Atomic');
const Formula = require('./Formula');
const EFormulaStates = require('./EFormulaStates');
const LTLParser = require("../parser/LTLParser");
var   fs = require("fs");

module.exports = class LTLSimController {

    static init(traceLength) {
        return new LTLSimModel(traceLength);
    }

    static addAtomic(model, id) {
        if (model.atomics.keys.indexOf(id) === -1) {
            model.atomics.keys.push(id);
            model.atomics.values[id] = new Atomic(id, model.traceLength);
            return true;
        }
        return false;
    }

    static addFormula(model, id, expression) {
        if (model.formulas.keys.indexOf(id) === -1) {
            model.formulas.keys.push(id);
            model.formulas.values[id] = new Formula(id, expression, model.traceLength);

            // Add this formula to the respective atomics and add missing atomics
            model.formulas.values[id].atomics.forEach((a) => {
                if (model.atomics.keys.indexOf(a) === -1) {
                    LTLSimController.addAtomic(model, a);
                } 
                model.atomics.values[a].formulas.push(id);
            }) 

            /* Explicitly set the expression via LTLSIMController to enforce formula update */
            LTLSimController.setFormulaExpression(model, id, expression);

            return true;
        }
        return false;
    }

    static addFormulaFromFile(model, id, formulaFile) {
	    var data = fs.readFileSync(formulaFile);
            var myformula = data.toString()
	this.addFormula(model, id, myformula);
        return true;
    }

//===========================================================
// add traces to the controller
// load from CSV file
    static addTrace(model, tracefile) {
	    var data = fs.readFileSync(tracefile);
            var mycsv = data.toString()
		.split(/\n/)
		.map(function(lineStr){
			return lineStr.split(",");
		 });
	    var mytraces = mycsv.slice(1);
	    var myatomic_names = mycsv.slice(0,1);
	    var target_id;
            var id=0;
            myatomic_names[0].forEach((a) => {

			//
			// if atomic not yet defined, define it
			//
        	if (model.atomics.keys.indexOf(a) === -1) {
            		model.atomics.keys.push(a);
            		model.atomics.values[a] = 
				new Atomic(a, model.traceLength);
			}
       		target_id = model.atomics.keys.indexOf(a);
                
	    	var i=0;
            	while ((i < model.traceLength) && (i <mytraces.length-1)){
			var val = parseInt(mytraces[i][id],10);
			model.atomics.values[a].trace[i] = val;
			i = i+1;
			}
		id = id+1;
            }) 
        return true;
    }

    static removeFormula(model, id) {
        if (model.formulas.keys.indexOf(id) !== -1) {
            
            /* Remove this formula from all referencing atomics */
            model.formulas.values[id].atomics.forEach((a) => {
                if (model.atomics.keys.indexOf(a) !== -1) {
                    let idx = model.atomics.values[a].formulas.indexOf(id);
                    if (idx !== -1) {
                        model.atomics.values[a].formulas.splice(idx, 1);
                    }
                }
            })

            /* Remove the formula */
            delete model.formulas.values[id];
            model.formulas.keys.splice(model.formulas.keys.indexOf(id), 1);

            /* Remove atomics which do not influence anything */
            model.atomics.keys
                .filter((a) => (model.atomics.values[a].formulas.length === 0))
                .forEach((a) => {
                    delete model.atomics.values[a];
                    model.atomics.keys.splice(model.atomics.keys.indexOf(a), 1);
                })

            return true;
        }
        return false;
    }

    static setAtomicTrace(model, id, trace) {
        if (model.atomics.keys.indexOf(id) !== -1) {
            model.atomics.values[id].trace = trace;
            return true;
        }
        return false;
    }
    
    static setAtomicLabel(model, id, newLabel) {
        let oidx = model.atomics.keys.indexOf(id);
        let nidx = model.atomics.keys.indexOf(newLabel);
        if (oidx !== -1 && nidx === -1) {
            /* Change the id */
            model.atomics.keys[oidx] = newLabel;
            model.atomics.values[newLabel] = model.atomics.values[id];
            model.atomics.values[newLabel].id = newLabel;
            delete model.atomics.values[id];
            
            /* Change the id and occurances of the atomic in all referencing formulas */
            model.formulas.keys.forEach((f) => {
                let fidx = model.formulas.values[f].atomics.indexOf(id);
                if (fidx !== -1) {
                    let formula = model.formulas.values[f];
                    let expression = formula.expression;
                    let rgx = new RegExp(`\\b${id}\\b`, "g");
                    formula.atomics[fidx] = newLabel;
                    expression = formula.expression.replace(rgx, newLabel);
                    LTLSimController.setFormulaExpression(model, f, expression);
                }
            })

            return true;
        }
        return false;
    }

    static setFormulaExpression(model, id, expression) {
        if (model.formulas.keys.indexOf(id) !== -1) {
            let formula = model.formulas.values[id];
            formula.expression = expression;

            /* Parse the expression, set the subexpressions and render the formula tex */
            let result = LTLParser.parse(expression);
            formula.parsedExpression = result.expression;
            formula.parseErrors = result.errors;
            formula.atomics = [...result.atomics];
            formula.subexpressions = result.subexpressions
                                    .map((s, i) => ({
                                        id: `${formula.id}_${i+1}`,
                                        expression: s,
                                        trace: new Array(model.traceLength).fill(0),
                                        tex: Formula.render(s),
                                        value: EFormulaStates.UNKNOWN
                                    }));

            /* Remove this formula from atomics which do not influence it anymore */
            model.atomics.keys
                .filter((a) => (model.atomics.values[a].formulas.indexOf(id) !== -1))
                .forEach((a) => {
                    if (formula.atomics.indexOf(a) === -1) {
                        model.atomics.values[a].formulas
                            .splice(model.atomics.values[a].formulas.indexOf(id), 1);
                    }
                });

            /* Add this formula to its atomics, if not already present and add missing atomics */
            formula.atomics.forEach((a) => {
                if (model.atomics.keys.indexOf(a) === -1) {
                    LTLSimController.addAtomic(model, a);
                }
                if (model.atomics.values[a].formulas.indexOf(id) === -1) {
                    model.atomics.values[a].formulas.push(id);
                }
            })

            /* Remove atomics which do not influence anything */
            model.atomics.keys
                .filter((a) => (model.atomics.values[a].formulas.length === 0))
                .forEach((a) => {
                    delete model.atomics.values[a];
                    model.atomics.keys.splice(model.atomics.keys.indexOf(a), 1);
                })

            /* Change this formulas value to unknown */
            formula.value = EFormulaStates.UNKNOWN;
            
            /* Render the formula tex string */
            formula.tex = Formula.render(formula.parsedExpression);

            return true;
        }
        return false;
    }

    static setFormulaLabel(model, id, newLabel) {
        let oidx = model.formulas.keys.indexOf(id);
        let nidx = model.formulas.keys.indexOf(newLabel);
        if (oidx!== -1 && nidx === -1) {
            /* Change the id in all referencing atomics */
            model.atomics.keys.forEach((a) => {
                let aidx = model.atomics.values[a].formulas.indexOf(id);
                if (aidx !== -1) {
                    model.atomics.values[a].formulas[aidx] = newLabel;
                }
            })

            /* Change the id */
            model.formulas.keys[oidx] = newLabel;
            model.formulas.values[newLabel] = model.formulas.values[id];
            model.formulas.values[newLabel].id = newLabel;
            delete model.formulas.values[id];

            /* Change the id in the subexpressions */
            model.formulas.values[newLabel].subexpressions
                .forEach((s,i) => {
                    s.id = `${newLabel}_${i+1}`;
                });
            
            return true;
        }
        return false;
    }

    static setFormulaTrace(model, id, slabel, trace) {
        if (model.formulas.keys.indexOf(id) !== -1) {
            if (slabel) {
                let sindex = model.formulas.values[id].subexpressions
                        .findIndex((s) => (s.id === slabel));
                if (sindex !== -1) {
                    model.formulas.values[id].subexpressions[sindex].trace = trace;
                } else {
                    return false;
                }
            } else {
                model.formulas.values[id].trace = trace;
            }
            return true;
        }
        return false;
    }
    
    static setFormulaValue(model, id, slabel, value) {
        if (model.formulas.keys.indexOf(id) !== -1) {
            if (slabel || Number.isInteger(slabel)) {
                let sindex = (Number.isInteger(slabel)) ? slabel : 
                        model.formulas.values[id].subexpressions
                        .findIndex((s) => (s.id === slabel));
                if (sindex !== -1) {
                    model.formulas.values[id].subexpressions[sindex].value = value;
                } else {
                    return false;
                }
            } else {
                model.formulas.values[id].value = value;
            }
            return true;
        }
        return false;
    }

    static setTraceLength(model, traceLength) {
        model.traceLength = traceLength;
        model.atomics.keys.forEach((a) => {
            let atomic = model.atomics.values[a];
            if (atomic) {
                setLength(atomic, traceLength);
            }
        })
        model.formulas.keys.forEach((f) => {
            let formula = model.formulas.values[f];
            if (formula) {
                setLength(formula, traceLength);
                formula.subexpressions.forEach((s) => {
                    setLength(s, traceLength);
                })
            }
        })
        return true;
    }

    static getTraceLength(model) {
        return model.traceLength;
    }

    static getAtomics(model) {
        return model.atomics.values;
    }

    static getAtomic(model, id) {
        return (model.atomics.keys.indexOf(id) !== -1) ? model.atomics.values[id] : undefined;
    }

    static getAtomicKeys(model) {
        return model.atomics.keys;
    }
    
    static getFormulas(model) {
        return model.formulas.values;
    }

    static getFormula(model, id) {
        return (model.formulas.keys.indexOf(id) !== -1) ? model.formulas.values[id] : undefined;
    }

    static getFormulaKeys(model) {
        return model.formulas.keys;
    }

    static getFilter(model, id, subformulas) {
        let formula = LTLSimController.getFormula(model, id);
        let result = {
            id: id,
            subexpressions: []
        }
        if (formula && subformulas) {
            if (typeof subformulas === "boolean") {
                result.subexpressions = formula.subexpressions.map((s, i) => (i));
            } else if (Array.isArray(subformulas)) {
                result.subexpressions = subformulas;
            } else {
                let subexpressions = subformulas[id];
                if (subexpressions) {
                    result.subexpressions = subexpressions;
                }
            }
        } 
        return result;
    }
    
};

function setLength(container, length) {
    if (length > container.trace.length) {
        container.trace = container.trace
                            .concat(new Array(length - container.trace.length)
                            .fill(container.trace[container.trace.length-1]));
    } else if (length < container.trace.length) {
        container.trace = container.trace.slice(0, length);
    }

};
