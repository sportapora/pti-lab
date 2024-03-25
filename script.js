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
  let idbill = 1;
  let balance = 0;
  let transactions = [];
  let billinfo = [];
  let nombill = "";
  let namebill = "";
  let deadbill = "";
  let transactionsType = [];

  $("#submitButton").on("click", () => {
    username = $("#name").val();

    // If user logged in
    if (username) {
      $(".username").text(username);
      $("nav").css("display", "block");

      // Display main page
      $("#loginPage").css("display", "none");
      $("#main").css("display", "block");
      $("#outcome").css("display", "none");
      $("#about").css("display", "none");
      $("#income").css("display", "none");
      $("#transactionType").css("display", "none");
      $("#aboutUs").css("display", "none");
      $("#income-link").removeClass("active");
      $("#main-link").addClass("active");
      $("#outcome-link").removeClass("active");
      $("#about-link").removeClass("active");
      $("#transType-link").removeClass("active");
      $("#aboutUs-link").removeClass("active");
      displayTransactions(transactions);

      Swal.fire({
        title: "Welcome!",
        text: `Welcome back, ${username}!`,
        icon: "success",
        confirmButtonText: "Okay",
      });

      $("#main-link").on("click", () => {
        $("#main").css("display", "block");
        $("#outcome").css("display", "none");
        $("#about").css("display", "none");
        $("#income").css("display", "none");
        $("#transactionType").css("display", "none");
        $("#aboutUs").css("display", "none");
        $("#bill").css("display", "none");
        $("#income-link").removeClass("active");
        $("#main-link").addClass("active");
        $("#outcome-link").removeClass("active");
        $("#about-link").removeClass("active");
        $("#transType-link").removeClass("active");
        $("#bill-link").removeClass("active");
        $("#aboutUs-link").removeClass("active");
        $("body").css("background", "url('./images/HomePage.jpg')no-repeat");
        $("body").css("min-height", "100vh");
        displayTransactions(transactions, balance);
      });

      $("#balance").text(IDR.format(balance));

      // Display income page
      $("#income-link").on("click", () => {
        $("#main").css("display", "none");
        $("#outcome").css("display", "none");
        $("#about").css("display", "none");
        $("#income").css("display", "block");
        $("#transactionType").css("display", "none");
        $("#bill").css("display", "none");
        $("#aboutUs").css("display", "none");
        $("#income-link").addClass("active");
        $("#main-link").removeClass("active");
        $("#outcome-link").removeClass("active");
        $("#about-link").removeClass("active");
        $("#transType-link").removeClass("active");
        $("#bill-link").removeClass("active");
        $("#aboutUs-link").removeClass("active");

        $("body").css("background", "url('./images/HomePage.jpg')no-repeat");
        $("body").css("min-height", "100vh");

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
          let op5 = document.createElement("option");
          op5.innerHTML = "--OTHER OPTION--";
          op5.setAttribute("disabled", "true");

          select.append(op1);
          select.append(op2);
          select.append(op3);
          select.append(op4);
          select.append(op5);

          for (let i = 0; i < transactionsType.length; i++) {
            if (transactionsType[i].transType == "income") {
              let customOpt = document.createElement("option");
              customOpt.innerHTML = transactionsType[i].category;
              select.append(customOpt);
            }
          }
        });
      });

      // Display outcome page
      $("#outcome-link").on("click", () => {
        $("#main").css("display", "none");
        $("#outcome").css("display", "block");
        $("#about").css("display", "none");
        $("#income").css("display", "none");
        $("#transactionType").css("display", "none");
        $("#bill").css("display", "none");
        $("#aboutUs").css("display", "none");
        $("#income-link").removeClass("active");
        $("#main-link").removeClass("active");
        $("#outcome-link").addClass("active");
        $("#about-link").removeClass("active");
        $("#transType-link").removeClass("active");
        $("#bill-link").removeClass("active");
        $("#aboutUs-link").removeClass("active");

        $("body").css("background", "url('./images/HomePage.jpg')no-repeat");
        $("body").css("min-height", "100vh");

        $("#outcome-form #transType").on("focus", () => {
          let select = $("#outcome-form #transType");
          select.text("");

          let op1 = document.createElement("option");
          op1.innerHTML = "Salary";
          let op2 = document.createElement("option");
          op2.innerHTML = "Investment";
          let op3 = document.createElement("option");
          op3.innerHTML = "Royalty";
          let op4 = document.createElement("option");
          op4.innerHTML = "Others";
          let op5 = document.createElement("option");
          op5.innerHTML = "--OTHER OPTION--";
          op5.setAttribute("disabled", "true");

          select.append(op1);
          select.append(op2);
          select.append(op3);
          select.append(op4);
          select.append(op5);

          for (let i = 0; i < transactionsType.length; i++) {
            if (transactionsType[i].transType == "outcome") {
              let customOpt = document.createElement("option");
              customOpt.innerHTML = transactionsType[i].category;
              select.append(customOpt);
            }
          }
        });
      });

      // Display transaction type page
      $("#transType-link").click(function () {
        $("#main").css("display", "none");
        $("#outcome").css("display", "none");
        $("#about").css("display", "none");
        $("#bill").css("display", "none");
        $("#income").css("display", "none");
        $("#aboutUs").css("display", "none");
        $("#transactionType").css("display", "block");
        $("#income-link").removeClass("active");
        $("#main-link").removeClass("active");
        $("#outcome-link").removeClass("active");
        $("#about-link").removeClass("active");
        $("#aboutUs-link").removeClass("active");
        $("#bill-link").removeClass("active");
        $("#transType-link").addClass("active");

        $("body").css("background", "url('./images/HomePage.jpg')no-repeat");
        $("body").css("min-height", "100vh");
      });

      // Display about us page
      $("#aboutUs-link").click(function () {
        $("#main").css("display", "none");
        $("#outcome").css("display", "none");
        $("#about").css("display", "none");
        $("#income").css("display", "none");
        $("#bill").css("display", "none");
        $("#aboutUs").css("display", "block");
        $("#transactionType").css("display", "none");
        $("#income-link").removeClass("active");
        $("#main-link").removeClass("active");
        $("#outcome-link").removeClass("active");
        $("#about-link").addClass("active");
        $("#aboutUs-link").removeClass("active");
        $("#bill-link").removeClass("active");
        $("#transType-link").removeClass("active");

        $("body").css(
          "background",
          "url('./images/bgBaru.jpg')no-repeat  fixed"
        );
        $("body").css("min-height", "100vh");
        $("body").css("background-size", "cover");
      });

      // Display bill reminder
      $("#bill-link").on("click", () => {
        $("#income").css("display", "none");
        $("#outcome").css("display", "none");
        $("#about").css("display", "none");
        $("#main").css("display", "none");
        $("#transactionType").css("display", "none");
        $("#bill").css("display", "block");
        $("#main-link").removeClass("active");
        $("#income-link").removeClass("active");
        $("#outcome-link").removeClass("active");
        $("#about-link").removeClass("active");
        $("#transType-link").removeClass("active");
        $("#bill-link").addClass("active");
        displayBill(billinfo);
      });

      $("#submit-bill").on("click", () => {
        deadbill = $("#billDeadline");
        nombill = $("#billNom");
        namebill = $("#billName");
        type = "bill";

        if (!deadbill.val() || !namebill.val() || !nombill.val()) {
          Swal.fire({
            title: "Error!",
            text: "Please fill the form!",
            icon: "error",
            confirmButtonText: "Okay",
          });
        } else {
          billinfo.push({
            idbill: idbill,
            deadbill: deadbill.val(),
            namebill: namebill.val(),
            nombill: nombill.val(),
            type: type,
          });
          idbill++;
          deadbill.val("");
          nombill.val("");
          namebill.val("");

          Swal.fire({
            title: "Success!",
            text: "The reminder has been added!",
            icon: "success",
            confirmButtonText: "Okay",
          });

          displayBill(billinfo);
        }
      });

      $("#submit-transType").click(function () {
        let category = $("#category").val();
        let transType = $("#transTypeCategory").val();
        let same = false;

        for (let i = 0; i < transactionsType.length; i++) {
          if (
            transactionsType[i].transType == transType &&
            transactionsType[i].category == category
          ) {
            Swal.fire({
              title: "Error!",
              text: "Transaction type already exist",
              icon: "error",
              confirmButtonText: "Okay",
            });

            same = true;
          }
        }

        if (!same) {
          transactionsType.push({ category, transType });
          $("#category").val("");
          Swal.fire({
            title: "Success!",
            text: "Transaction type has been submitted!",
            icon: "success",
            confirmButtonText: "Okay",
          });
          console.log(transactionsType);
        }
      });

      $("#submit-income").on("click", () => {
        transType = $("#transType");
        transName = $("#transName");
        transNom = $("#transNom");
        type = "income";
        balance = balance + 1 * transNom.val();

        if (!transName.val() || !transNom.val() || !transType.val()) {
          Swal.fire({
            title: "Error!",
            text: "Please fill the form!",
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
            text: "The transaction has been added!",
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      });

      $("#submit-outcome").on("click", () => {
        transType = $("#outcome-form #transType");
        transName = $("#outcome-form #transName");
        transNom = $("#outcome-form #transNom");
        type = "outcome";
        if (!transName.val() || !transNom.val() || !transType.val()) {
          Swal.fire({
            title: "Error!",
            text: "Please fill the form!",
            icon: "error",
            confirmButtonText: "Okay",
          });
        } else {
          if (balance > 0) {
            if (transNom.val() > balance) {
              Swal.fire({
                title: "Error!",
                text: "the balance is not sufficient!",
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
              balance = balance - 1 * transNom.val();
              transType.val("");
              transName.val("");
              transNom.val("");

              Swal.fire({
                title: "Success!",
                text: "The transaction has been added!",
                icon: "success",
                confirmButtonText: "Okay",
              });
            }
          } else {
            Swal.fire({
              title: "Error!",
              text: "the balance is not sufficient!",
              icon: "warning",
              confirmButtonText: "Okay",
            });
          }
        }
      });

      $(document).on("click", "#paidbtn", function () {
        const index = $(this).closest(".parent").index();
        $(this).closest(".parent").remove();
        billinfo.splice(index, 1);
        displayBill(billinfo);
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

const displayTransactions = (transactions, balance) => {
  let h3 = document.createElement("h3");
  h3.classList.add("fw-bold", "mt-5");
  h3.innerHTML = "Transaction";
  $("#test").html("");
  $("#test").append(h3);

  if (transactions.length > 0) {
    $("#no-transaction").css("display", "none");
    let balanceEl = $("#balance");
    let transDiv = document.createElement("div");
    transDiv.classList.add(
      "d-flex",
      "justify-content-between",
      "gap-3",
      "flex-column",
      "p-5"
    );
    $("#test").css("overflow", "scroll");
    transDiv.innerHTML = "";

    for (let i = 0; i < transactions.length; i++) {
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
        "flex-column",
        "flex-md-row",
        "justify-content-start",
        "justify-content-md-between",
        "align-items-md-center",
        "align-items-start"
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
    h6.innerHTML = "There's been no transaction recently";
    h6.classList.add("mt-3");

    $("#test").text("");
    $("#test").append(h3);
    $("#test").append(h6);
  }
};

const displayBill = (billinfo) => {
  let h3 = document.createElement("h3");
  h3.classList.add("fw-bold", "mt-5");
  h3.innerHTML = "Bill information";
  $("#billInformation").html("");
  $("#billInformation").append(h3);

  if (billinfo.length > 0) {
    $("#no-transaction").css("display", "none");
    let transDiv = document.createElement("div");
    transDiv.classList.add(
      "d-flex",
      "justify-content-between",
      "gap-3",
      "flex-column",
      "p-5"
    );
    $("#billInformation").css("overflow", "scroll");
    transDiv.innerHTML = "";

    for (let i = 0; i < billinfo.length; i++) {
      let div = document.createElement("div");
      let leftSection = document.createElement("div");
      let rightSection = document.createElement("div");
      let toprightSection = document.createElement("div");
      let botrightSection = document.createElement("div");
      let button = document.createElement("button");
      let h5 = document.createElement("h5");
      let divh6 = document.createElement("div");
      let h6text = document.createElement("h6");
      let h6date = document.createElement("h6");
      let hNominal = document.createElement("h4");

      h5.innerHTML = billinfo[i].namebill;
      h5.classList.add("fw-bold");
      h6text.innerHTML = "Deadline: ";
      h6date.innerHTML = billinfo[i].deadbill;
      hNominal = billinfo[i].nombill;
      divh6.classList.add("d-flex","flex-column","flex-lg-row");
      divh6.append(h6text);
      divh6.append(h6date);
      leftSection.append(divh6);
      div.classList.add(
        "w-100",
        "w-lg-50",
        "bg-danger-subtle",
        "p-3",
        "rounded-3",
        "d-flex",
        "flex-column",
        "flex-lg-row",
        "justify-content-start",
        "justify-content-lg-between",
        "align-items-center",
        "align-items-xs-start",
        "parent",
      );

      leftSection.classList.add("d-flex", "flex-column","align-items-center","align-items-lg-start");
      leftSection.append(h5);
      leftSection.append(divh6);
      div.append(leftSection);
      
      rightSection.classList.add("d-flex", "flex-column","align-items-center","align-items-lg-end");
      toprightSection.classList.add("fw-bold");
      toprightSection.append(IDR.format(hNominal));
      
      button.classList.add("btn", "btn-outline-success", "btn-sm", "mt-2");
      button.setAttribute("id", "paidbtn");
      button.innerHTML = "Paid";

      botrightSection.append(button);
      rightSection.append(toprightSection);
      rightSection.append(botrightSection);
      div.append(rightSection);

      transDiv.append(div);
    }
    $("#billInformation").append(transDiv);
  } else {
    let h6 = document.createElement("h6");

    h6.setAttribute("id", "no-transaction");
    h6.innerHTML = "There's been no bill recently";
    h6.classList.add("mt-3");

    $("#billInformation").text("");
    $("#billInformation").append(h3);
    $("#billInformation").append(h6);
  }
};


