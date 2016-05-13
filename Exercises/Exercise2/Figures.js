/**
 * Created by Jose Leon on 5/4/2016.
 */


define(function() {
        var figures = []; //////////////////AN ARRAY WITH THE EXISTING FIGURES

        //function Figure(x, y) {
        //    this.origX = x;
        //    this.origY = y;
        //}
        function Rectangle(x,y) {
            this.origX = x;
            this.origY = y;
        }
        function Square(x,y){
            this.origX = x;
            this.origY = y;
        }
        function Circle(x,y){
            this.origX = x;
            this.origY = y;
        }
        //Rectangle.prototype = Object.create(Figure.prototype);///////////////INHERITANCE FOR ALL FIGURES
        //Rectangle.prototype.constructor = Rectangle;
        //Square.prototype = Object.create(Figure.prototype);
        //Square.prototype.constructor = Square;
        //Circle.prototype = Object.create(Figure.prototype);
        //Circle.prototype.constructor = Circle;

///////////////PROTOTYPE METHODS FOR EACH FIGURE////////////////////
        Rectangle.prototype.draw = function (ctx) {
            ctx.fillRect(this.origX - 60, this.origY - 30, 120, 60);
        };
        Rectangle.prototype.check = function (x, y) {
            if (x > this.origX - 60 && x < this.origX + 60 && y > this.origY - 30 && y < this.origY + 30)
                return this;
        };
        Square.prototype.draw = function (ctx) {
            ctx.fillRect(this.origX - 30, this.origY - 30, 60, 60);
        };
        Square.prototype.check = function (x, y) {
            if (x > this.origX - 30 && x < this.origX + 30 && y > this.origY - 30 && y < this.origY + 30)
                return this;
        };
        Circle.prototype.draw = function (ctx) {
            ctx.beginPath();
            ctx.arc(this.origX, this.origY, 30, 0, 2 * Math.PI);
            ctx.fill();
        };
        Circle.prototype.check = function (x, y) {
            if (Math.sqrt(Math.pow(x - this.origX, 2) + (Math.pow(y - this.origY, 2))) < 30)
                return true;
        };
        return {
            figures:figures,
            Rectangle:Rectangle,
            Square:Square,
            Circle:Circle
        }
    }
);