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
        // get sale’s shared version
        const { data: sale } = await sui.getObject({
          id: saleId,
          options: { showOwner: true },
        });
        const saleVersion = sale.owner?.Shared?.initial_shared_version;
        if (!saleVersion) throw new Error("no saleVersion");

        // fetch AdminCaps
        const { data: owned } = await sui.getOwnedObjects({
          owner,
          options: { showType: true, showVersion: true },
        });
        const candidates = owned.filter((o) => o.data.type === capType);

        // pick the one whose version matches
        const match = candidates.find(
          (o) => String(o.data.version) === String(saleVersion)
        );
        if (match) setAdminCapId(match.data.objectId);
      } catch (e) {
        console.warn("useAdminCap:", e.message || e);
      }
    })();
  }, [saleId, tokenType, owner, sui]);

  return adminCapId;
}
