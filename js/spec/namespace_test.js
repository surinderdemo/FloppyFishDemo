describe("Namespace Unit Tests", function() {


  it("and has a positive case", function() {
  	play_sound(soundJump);
  	console.log(thistime);
    expect(thistime).not.toBeNull;
  });

  it("and can have a negative case", function() {
    expect(false).not.toBe(true);
  });
});