// Generated from NuSMV.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by NuSMVParser.

function NuSMVVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

NuSMVVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
NuSMVVisitor.prototype.constructor = NuSMVVisitor;

// Visit a parse tree produced by NuSMVParser#plHolders.
NuSMVVisitor.prototype.visitPlHolders = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#durPlHolders.
NuSMVVisitor.prototype.visitDurPlHolders = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#proposition.
NuSMVVisitor.prototype.visitProposition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#simpleExpr.
NuSMVVisitor.prototype.visitSimpleExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#binaryBoundedPastOp.
NuSMVVisitor.prototype.visitBinaryBoundedPastOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#binaryBoundedFutureOp.
NuSMVVisitor.prototype.visitBinaryBoundedFutureOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#timedBinarySaltPastOp.
NuSMVVisitor.prototype.visitTimedBinarySaltPastOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#binaryPastOp.
NuSMVVisitor.prototype.visitBinaryPastOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#unaryPastOp.
NuSMVVisitor.prototype.visitUnaryPastOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#unaryBoundedPastOp.
NuSMVVisitor.prototype.visitUnaryBoundedPastOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#timedUnarySaltFutureOp.
NuSMVVisitor.prototype.visitTimedUnarySaltFutureOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#simpleltl.
NuSMVVisitor.prototype.visitSimpleltl = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#timedUnarySaltPastOp.
NuSMVVisitor.prototype.visitTimedUnarySaltPastOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#binaryFutureOp.
NuSMVVisitor.prototype.visitBinaryFutureOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#unaryBoundedFutureOp.
NuSMVVisitor.prototype.visitUnaryBoundedFutureOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#timedBinarySaltFutureOp.
NuSMVVisitor.prototype.visitTimedBinarySaltFutureOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#unaryFutureOp.
NuSMVVisitor.prototype.visitUnaryFutureOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#pastTimedUnaryOp.
NuSMVVisitor.prototype.visitPastTimedUnaryOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#pastUnaryOp.
NuSMVVisitor.prototype.visitPastUnaryOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#pastBinaryOp.
NuSMVVisitor.prototype.visitPastBinaryOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#futureTimedUnaryOp.
NuSMVVisitor.prototype.visitFutureTimedUnaryOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#futureUnaryOp.
NuSMVVisitor.prototype.visitFutureUnaryOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#futureBinaryOp.
NuSMVVisitor.prototype.visitFutureBinaryOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#comparisonOp.
NuSMVVisitor.prototype.visitComparisonOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#bound.
NuSMVVisitor.prototype.visitBound = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#saltBound.
NuSMVVisitor.prototype.visitSaltBound = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#lp.
NuSMVVisitor.prototype.visitLp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#rp.
NuSMVVisitor.prototype.visitRp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#not.
NuSMVVisitor.prototype.visitNot = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#and.
NuSMVVisitor.prototype.visitAnd = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#or.
NuSMVVisitor.prototype.visitOr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#xor.
NuSMVVisitor.prototype.visitXor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#implies.
NuSMVVisitor.prototype.visitImplies = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#equiv.
NuSMVVisitor.prototype.visitEquiv = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#f.
NuSMVVisitor.prototype.visitF = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by NuSMVParser#t.
NuSMVVisitor.prototype.visitT = function(ctx) {
  return this.visitChildren(ctx);
};



exports.NuSMVVisitor = NuSMVVisitor;