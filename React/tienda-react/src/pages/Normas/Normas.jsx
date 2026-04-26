import "./Normas.less";
import React from "react";
import { useTranslation } from "react-i18next";

function Normas() {
  const { t } = useTranslation();

  return (
    <div className="normas-container">
      <h2>{t("normas.privacyTitle")}</h2>
      <p>{t("normas.privacy1")}</p>
      <p>{t("normas.privacy2")}</p>
      <p>{t("normas.privacy3")}</p>
      <p>{t("normas.privacy4")}</p>

      <h2>{t("normas.termsTitle")}</h2>
      <p>{t("normas.terms1")}</p>
      <p>{t("normas.terms2")}</p>
      <p>{t("normas.terms3")}</p>

      <h2>{t("normas.cookiesTitle")}</h2>
      <p>{t("normas.cookies1")}</p>
      <p>{t("normas.cookies2")}</p>

      <h2>{t("normas.legalTitle")}</h2>
      <p>{t("normas.legal1")}</p>
      <p>{t("normas.legal2")}</p>
    </div>
  );
}

export default Normas;
