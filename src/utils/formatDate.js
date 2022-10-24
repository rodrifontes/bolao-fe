export default function formatDate(date) {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const diaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  let data = new Date(date);
  let dataFormatada = ((diaSemana[data.getDay()] + " " + data.getDate() + " de " + meses[(data.getMonth())] + " às " + data.getHours() + ":" + ("0" + data.getMinutes()).slice(-2)));
  return (dataFormatada);
}
