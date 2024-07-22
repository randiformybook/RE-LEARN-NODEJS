const coba = (id, callback) => {
  const waktu = id === 1 ? 3000 : 2000;
  setTimeout(() => {
    const nama = id === 1 ? "Randi" : "Himawan";
    callback({ id, nama });
  }, waktu);
};

const getCoba1 = coba(1, (hasil) => {
  console.log(hasil.nama);
});
