let IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

$(document).ready(() => {
  let username = "";
  let transType = "";
  let transName = "";
  let transNom = "";
  let type = "";
  let id = 1;
  let balance = 0;
  let transactions = [];

  $("#submitButton").on("click", () => {
    username = $("#name").val();

    // If user logged in
    if (username) {
      $(".username").text(username);
      $("nav").css("display", "block");

      // Display main page
      $("#loginPage").css("display", "none");
      $("#income").css("display", "none");
      $("#outcome").css("display", "none");
      $("#about").css("display", "none");
      $("#main").css("display", "block");
      $("#main-link").addClass("active");
      $("#income-link").removeClass("active");
      $("#outcome-link").removeClass("active");
      $("#about-link").removeClass("active");
      displayTransactions(transactions);

      Swal.fire({
        title: "Welcome!",
        text: `Welcome back, ${username}!`,
        icon: "success",
        confirmButtonText: "Okay",
      });

      $("#main-link").on("click", () => {
        $("#income").css("display", "none");
        $("#outcome").css("display", "none");
        $("#about").css("display", "none");
        $("#main").css("display", "block");
        $("#main-link").addClass("active");
        $("#income-link").removeClass("active");
        $("#outcome-link").removeClass("active");
        $("#about-link").removeClass("active");
        displayTransactions(transactions);
      });

      $("#balance").text(IDR.format(balance));

      // Display income page
      $("#income-link").on("click", () => {
        $("#main").css("display", "none");
        $("#outcome").css("display", "none");
        $("#about").css("display", "none");
        $("#income").css("display", "block");
        $("#income-link").addClass("active");
        $("#main-link").removeClass("active");
        $("#outcome-link").removeClass("active");
        $("#about-link").removeClass("active");

        $("#transType").on("focus", () => {
          let select = $("#transType");
          select.text("");

          let op1 = document.createElement("option");
          op1.innerHTML = "Education";
          let op2 = document.createElement("option");
          op2.innerHTML = "Food";
          let op3 = document.createElement("option");
          op3.innerHTML = "Play";
          let op4 = document.createElement("option");
          op4.innerHTML = "Others";

          select.append(op1);
          select.append(op2);
          select.append(op3);
          select.append(op4);
        });
      });

      $("#submit-income").on("click", () => {
        transType = $("#transType");
        transName = $("#transName");
        transNom = $("#transNom");
        type = "income";

        if (transName == "" || transNom == "" || transType == "") {
          Swal.fire({
            title: "Error!",
            text: `Silakan lengkapi form!`,
            icon: "error",
            confirmButtonText: "Okay",
          });
        } else {
          transactions.push({
            id: id,
            transType: transType.val(),
            name: transName.val(),
            nominal: transNom.val(),
            type: type,
          });
          id++;
          transType.val("");
          transName.val("");
          transNom.val("");

          Swal.fire({
            title: "Success!",
            text: `Transaksi berhasil ditambahkan!`,
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please insert your name!",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  });
});

const displayTransactions = (transactions) => {
  let h3 = document.createElement("h3");
  h3.classList.add("fw-bold", "mt-5");
  h3.innerHTML = "Transaction";
  $("#test").html("");
  $("#test").append(h3);

  if (transactions.length > 0) {
    $("#no-transaction").css("display", "none");
    let balanceEl = $("#balance");
    let balance = 0;
    let transDiv = document.createElement("div");
    transDiv.classList.add(
      "d-flex",
      "justify-content-between",
      "gap-3",
      "flex-column",
      "p-5"
    );
    transDiv.innerHTML = "";

    for (let i = 0; i < transactions.length; i++) {
      balance = balance + 1 * transactions[i].nominal;

      let div = document.createElement("div");
      let leftSection = document.createElement("div");
      let rightSection = document.createElement("div");
      let h5 = document.createElement("h5");
      let h6 = document.createElement("h6");
      let hNominal = document.createElement("h4");

      h5.innerHTML = transactions[i].name;
      h5.classList.add("fw-bold");
      h6.innerHTML = transactions[i].transType;
      hNominal = transactions[i].nominal;

      div.classList.add(
        "w-100",
        "w-md-50",
        `bg-${
          transactions[i].type == "income" ? "success-subtle" : "danger-subtle"
        }`,
        "p-3",
        "rounded-3",
        "d-flex",
        "flex-row",
        "justify-content-between",
        "align-items-center"
      );

      leftSection.classList.add("d-flex", "flex-column", "align-items-start");
      rightSection.classList.add("fw-bold");
      leftSection.append(h5);
      leftSection.append(h6);
      rightSection.append(IDR.format(hNominal));
      div.append(leftSection);
      div.append(rightSection);
      transDiv.append(div);
    }
    $("#test").append(transDiv);
    balanceEl.text(IDR.format(balance));
  } else {
    let h6 = document.createElement("h6");

    h6.setAttribute("id", "no-transaction");
    h6.innerHTML = "Belum ada transaksi sejauh ini";
    h6.classList.add("mt-3");

    $("#test").text("");
    $("#test").append(h3);
    $("#test").append(h6);
  }
};
