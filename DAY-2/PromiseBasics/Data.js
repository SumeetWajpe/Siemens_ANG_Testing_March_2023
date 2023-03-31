function greet(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Hello ${name}`);
      //   reject("Error !!!");
    }, 2000);
  });
}
