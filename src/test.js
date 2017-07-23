function Vehicle(name, speed) {
    console.log("What means this in Vehicle: ");
    console.log(this);
  this.name = name;
  this.speed = speed;
}
Vehicle.prototype.drive = function () {
  console.log(this.name + ' runs at ' + this.speed)
};
var tico = new Vehicle('tico', 50);
tico.drive(); // 'tico runs at 50'
function Sedan(name, speed, maxSpeed) {
    console.dir(this);
  Vehicle.apply(this, arguments)
  this.maxSpeed = maxSpeed;
}
//console.log(this);
Sedan.prototype = Object.create(Vehicle.prototype);
Sedan.prototype.constructor = Sedan;
Sedan.prototype.boost = function () {
  console.log(this.name + ' boosts its speed at ' + this.maxSpeed);
};
var sonata = new Sedan('sonata', 100, 200);
sonata.drive(); // 'sonata runs at 100'
sonata.boost(); // 'sonata boosts its speed at 200'

var obj = {
string: 'zero',
yell: function() {
    console.log("logging... : "+this.string);
}
};
var obj2 = {
string: 'what?'
};
obj.yell(); // 'zero';
obj.yell.call(obj2); // 'what?' //  obj2의 입장에서yell이 호출되는 꼴이다.
// this는 기본적으로 window
