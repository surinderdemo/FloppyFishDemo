describe("Cookie Handler Unit Tests", function() {

  it("Set Cookie Name, Value and Expiry Days", function() {
  	setCookie("test",42, 999);
  	expect(setCookie.expires).not.toBeNull;
  	console.log(setCookie.expires);
  });

  it("Get Cookie", function() {
    var gC = getCookie("test");
    console.log(gC);
    expect(gC).not.toBeNull;
  });
});
