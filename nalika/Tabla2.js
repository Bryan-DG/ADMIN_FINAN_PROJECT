!(function (u, t, e, a) {
    function _(t, e) {
      return new Intl.NumberFormat(e.language, {
        style: "currency",
        currency: e.currency,
      }).format(t);
    }
    u.extend(u.fn, {
      accrue: function (r) {
        return (
          (r = u.extend({ calculationMethod: o }, u.fn.accrue.options, r)),
          this.each(function () {
            var e = u(this);
            e.find(".form").length || e.append('<div class="form"></div>');
            var a, n;
            d(e, r, "amount"), d(e, r, "rate"), d(e, r, "term");
            if ("compare" == r.mode) d(e, r, "rate_compare");
            switch (
              ((a =
                ".results" === r.response_output_div
                  ? (0 === e.find(".results").length &&
                      e.append('<div class="results"></div>'),
                    e.find(".results"))
                  : u(r.response_output_div)),
              r.mode)
            ) {
              case "basic":
                n = o;
                break;
              case "compare":
                n = m;
                break;
              case "amortization":
                n = l;
            }
            n(e, r, a),
              "button" == r.operation
                ? (0 === e.find("button").length &&
                    0 === e.find("input[type=submit]").length &&
                    0 === e.find("input[type=image]").length &&
                    e
                      .find(".form")
                      .append(
                        '<button class="accrue-calculate">' +
                          r.button_label +
                          "</button>"
                      ),
                  e
                    .find("button, input[type=submit], input[type=image]")
                    .each(function () {
                      u(this).click(function (t) {
                        t.preventDefault(), n(e, r, a);
                      });
                    }))
                : e.find("input, select").each(function () {
                    u(this).bind("keyup change", function () {
                      n(e, r, a);
                    });
                  }),
              e.find("form").each(function () {
                u(this).submit(function (t) {
                  t.preventDefault(), n(e, r, a);
                });
              });
          })
        );
      },
    }),
      (u.fn.accrue.options = {
        mode: "basic",
        operation: "keyup",
        currency: "USD",
        language: "en",
        default_values: {
          amount: "7,500",
          rate: "7%",
          rate_compare: "1.49%",
          term: "36m",
        },
        field_titles: {
          amount: "Loan Amount",
          rate: "Rate (APR)",
          rate_compare: "Comparison Rate",
          term: "Term",
        },
        button_label: "Calculate",
        field_comments: {
          amount: "",
          rate: "",
          rate_compare: "",
          term: "Format: 12m, 36m, 3y, 7y",
        },
        response_output_div: ".results",
        response_basic:
          "<p><strong>Monthly Payment:</strong><br />%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />%total_payments%</p><p><strong>Total Interest:</strong><br />%total_interest%</p>",
        response_compare:
          '<p class="total-savings">Save %savings% in interest!</p>',
        error_text: '<p class="error">Please fill in all fields.</p>',
        callback: function (t, e) {},
      });
    var d = function (t, e, a) {
        var n;
        return (
          t.find(".accrue-" + a).length
            ? (n = t.find(".accrue-" + a))
            : t.find("." + a).length
            ? (n = t.find("." + a))
            : t.find("input[name~=" + a + "]").length
            ? t.find("input[name~=" + a + "]")
            : (n = ""),
          "string" != typeof n
            ? n.val()
            : "term_compare" != a &&
              (t
                .find(".form")
                .append(
                  '<div class="accrue-field-' +
                    a +
                    '"><p><label>' +
                    e.field_titles[a] +
                    ':</label><input type="text" class="' +
                    a +
                    '" value="' +
                    e.default_values[a] +
                    '" />' +
                    (0 < e.field_comments[a].length
                      ? "<small>" + e.field_comments[a] + "</small>"
                      : "") +
                    "</p></div>"
                ),
              t.find("." + a).val())
        );
      },
      o = function (t, e, a) {
        var n = u.loanInfo({
          amount: d(t, e, "amount"),
          rate: d(t, e, "rate"),
          term: d(t, e, "term"),
        });
        if (0 !== n) {
          var r = e.response_basic
            .replace("%payment_amount%", _(n.payment_amount_formatted, e))
            .replace("%num_payments%", n.num_payments)
            .replace("%total_payments%", _(n.total_payments_formatted, e))
            .replace("%total_interest%", _(n.total_interest_formatted, e));
          a.html(r);
        } else a.html(e.error_text);
        e.callback(t, n);
      },
      m = function (t, e, a) {
        var n = d(t, e, "term_compare");
        "boolean" == typeof n && (n = d(t, e, "term"));
        var r = u.loanInfo({
            amount: d(t, e, "amount"),
            rate: d(t, e, "rate"),
            term: d(t, e, "term"),
          }),
          o = u.loanInfo({
            amount: d(t, e, "amount"),
            rate: d(t, e, "rate_compare"),
            term: n,
          }),
          m = { loan_1: r, loan_2: o };
        if (0 !== r && 0 !== o) {
          0 < r.total_interest - o.total_interest
            ? (m.savings = r.total_interest - o.total_interest)
            : (m.savings = 0);
          var l = e.response_compare
            .replace("%savings%", _(m.savings.toFixed(2), e))
            .replace("%loan_1_payment_amount%", _(o.payment_amount_formatted, e))
            .replace("%loan_1_num_payments%", o.num_payments)
            .replace("%loan_1_total_payments%", o.total_payments_formatted)
            .replace("%loan_1_total_interest%", _(o.total_interest_formatted, e))
            .replace("%loan_2_payment_amount%", _(r.payment_amount_formatted, e))
            .replace("%loan_2_num_payments%", r.num_payments)
            .replace("%loan_2_total_payments%", r.total_payments_formatted)
            .replace("%loan_2_total_interest%", _(r.total_interest_formatted, e));
          a.html(l);
        } else a.html(e.error_text);
        e.callback(t, m);
      },
      l = function (t, e, a) {
        var n = u.loanInfo({
          amount: d(t, e, "amount"),
          rate: d(t, e, "rate"),
          term: d(t, e, "term"),
        });
        if (0 !== n) {
          for (
            var r =
                '<table class="accrue-amortization"><thead><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Monto de Pago</th><th class="accrue-total-interest">Interés Total</th><th class="accrue-total-payments">Pagos Totales</th><th class="accrue-balance">Balance</th></tr></thead><tbody>',
              o = n.payment_amount - n.original_amount / n.num_payments,
              m = n.payment_amount - o,
              l = 0,
              s = 0,
              i = parseInt(n.original_amount, 10),
              c = 0;
            c < n.num_payments;
            c++
          ) {
            (l += o), (s += n.payment_amount), (i -= m);
            var p = "td";
            console.log(c)
            console.log(((c+1) % 12) === 0)
            c == n.num_payments - 1 && (p = "th"),
              (r =
                r +
                `<tr ${((c+1) % 12) === 0 ? "class='highlight'":""} ><` + // (i % 12 === 0) (isMember ? '$2.00' : '$10.00');
                //"<tr "+ ((c) % 12) === 0 ? " class='highlight' " : "" +"><" + // (i % 12 === 0) (isMember ? '$2.00' : '$10.00');
                p +
                ' class="accrue-payment-number">' +
                (c + 1) +
                "</" +
                p +
                "><" +
                p +
                ' class="accrue-payment-amount">' +
                _(n.payment_amount_formatted, e) +
                "</" +
                p +
                "><" +
                p +
                ' class="accrue-total-interest">' +
                _(l.toFixed(2), e) +
                "</" +
                p +
                "><" +
                p +
                ' class="accrue-total-payments">' +
                _(s.toFixed(2), e) +
                "</" +
                p +
                "><" +
                p +
                ' class="accrue-balance">' +
                _(i.toFixed(2), e) +
                "</" +
                p +
                "></tr>");
          }
          (r += "</tbody></table>"), a.html(r);
        } else a.html(e.error_text);
        e.callback(t, n);
      };
    (u.loanInfo = function (t) {
      var e = (void 0 !== t.amount ? t.amount : 0)
          .toString()
          .replace(/[^\d.]/gi, ""),
        a = (void 0 !== t.rate ? t.rate : 0).toString().replace(/[^\d.]/gi, ""),
        n = void 0 !== t.term ? t.term : 0;
      n = n.match("y")
        ? 12 * parseInt(n.replace(/[^\d.]/gi, ""), 10)
        : parseInt(n.replace(/[^\d.]/gi, ""), 10);
      var r = a / 100 / 12,
        o = Math.pow(1 + r, n),
        m = (e * o * r) / (o - 1);
      return 0 < e * a * n
        ? {
            original_amount: e,
            payment_amount: m,
            payment_amount_formatted: m.toFixed(2),
            num_payments: n,
            total_payments: m * n,
            total_payments_formatted: (m * n).toFixed(2),
            total_interest: m * n - e,
            total_interest_formatted: (m * n - e).toFixed(2),
          }
        : 0;
    }),
      (u.loanAmount = function (t) {
        var e = (void 0 !== t.payment ? t.payment : 0)
            .toString()
            .replace(/[^\d.]/gi, ""),
          a = (void 0 !== t.rate ? t.rate : 0).toString().replace(/[^\d.]/gi, ""),
          n = void 0 !== t.term ? t.term : 0;
        n = n.match("y")
          ? 12 * parseInt(n.replace(/[^\d.]/gi, ""), 10)
          : parseInt(n.replace(/[^\d.]/gi, ""), 10);
        var r = a / 100 / 12,
          o = a / 100,
          m = e * (1 - Math.pow(1 + r, -1 * n)) * (12 / o);
        return 0 < m
          ? {
              principal_amount: m,
              principal_amount_formatted: (1 * m).toFixed(2),
              payment_amount: e,
              payment_amount_formatted: (1 * e).toFixed(2),
              num_payments: n,
              total_payments: e * n,
              total_payments_formatted: (e * n).toFixed(2),
              total_interest: e * n - m,
              total_interest_formatted: (e * n - m).toFixed(2),
            }
          : 0;
      });
  })(jQuery, window, document);
  