import { useState, useEffect } from "react";
import { useSuiClient } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "../constants/contract";

export default function useAdminCap(saleId, tokenType, owner) {
  const sui = useSuiClient();
  const [adminCapId, setAdminCapId] = useState(null);

  useEffect(() => {
    if (!saleId || !tokenType || !owner) return;

    const capType = `${PACKAGE_ID}::admin_config::AdminCap<${tokenType}>`;

    (async () => {
      try {
        const { data: owned } = await sui.getOwnedObjects({
          owner,
          options: { showType: true },
        });

        const candidates = owned.filter((o) => o.data.type === capType);

        console.log("🔍 Looking for AdminCap of type:", capType);
        console.log(
          "🔎 Found AdminCaps:",
          candidates.map((c) => c.data.objectId)
        );

        if (candidates.length === 0) {
          console.warn("⚠️ No AdminCap found for token type.");
          return;
        }

        if (candidates.length > 1) {
          console.warn("⚠️ Multiple AdminCaps found, using the first.");
        }

        setAdminCapId(candidates[0].data.objectId);
      } catch (e) {
        console.warn("useAdminCap:", e.message || e);
      }
    })();
  }, [saleId, tokenType, owner, sui]);

  return adminCapId;
}
