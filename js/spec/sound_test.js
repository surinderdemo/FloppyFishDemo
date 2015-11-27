describe("Sound Unit Tests", function() {


  it("Check to see if Sound plays", function() {
  	play_sound(soundJump);
  	console.log(thistime);
    expect(thistime).not.toBeNull;
  });

  it("and can have a negative case", function() {
    expect(false).not.toBe(true);
  });
});
