function generateRandomItemList() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const items = [];

    for (let i = 1; i <= 1000; i++) {
      const randomLetter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
      const randomNumber = Math.floor(Math.random() * 1000);
      const item = `Item ${randomLetter}${randomNumber}`;
      items.push(item);
    }

    return items;
  }

  export default generateRandomItemList;