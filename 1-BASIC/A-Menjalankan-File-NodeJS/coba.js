// const coba = (id, callback) => {
//   const waktu = id === 1 ? 3000 : 2000;
//   setTimeout(() => {
//     const nama = id === 1 ? "Randi" : "Himawan";
//     callback({ id, nama });
//   }, waktu);
// };

// const getCoba1 = coba(1, (hasil) => {
//   console.log(hasil.nama);
// });

const coba = (id, callback) => {
  const waktu = id === 1 ? 2500 : id === 2 ? 5000 : 1000;
  setTimeout(() => {
    const nama = id === 1 ? "Randi" : id === 2 ? "Himawan" : "Bapak";
    callback({ id, nama: nama });
  }, waktu);
};

coba(1, (hasil) => console.log(hasil));
coba(2, (hasil) => console.log(hasil));
coba(3, (hasil) => console.log(hasil));
