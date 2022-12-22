export const formatDateToShow = (date) => {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const diaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  let data = new Date(date);
  let dataFormatada = ((diaSemana[data.getDay()] + " " + data.getDate() + " de " + meses[(data.getMonth())] + " às " + data.getHours() + ":" + ("0" + data.getMinutes()).slice(-2)));
  return (dataFormatada);
}

export const formatIsoDate = (date) => {
  return date
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/, '$3-$2-$1 $4:$5');
}

export const maskDate = (date) => {
  return date
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{2})(\d{2})/, '$1 $2:$3');
}
