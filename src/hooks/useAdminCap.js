import { useState, useEffect } from "react";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { PACKAGE_ID } from "../constants/contract";

const client = new SuiClient({ url: getFullnodeUrl("testnet") });
const SALE_EVENT = `${PACKAGE_ID}::dashboard_utils::SaleLaunched`;

export default function useAdminCap(saleId) {
  const [adminCapId, setAdminCapId] = useState(null);

  useEffect(() => {
    if (!saleId) return;

    const fetchCap = async () => {
      try {
        const events = await client.queryEvents({
          query: { MoveEventType: SALE_EVENT },
          limit: 50,
        });

        for (const event of events.data) {
          const txDigest = event.id.txDigest;

          const tx = await client.getTransactionBlock({
            digest: txDigest,
            options: {
              showObjectChanges: true,
            },
          });

          const createdObjects = tx.objectChanges?.filter(
            (c) => c.type === "created"
          );

          const createdSale = createdObjects?.find((c) =>
            c.objectType?.startsWith(`${PACKAGE_ID}::sale_utils::TokenSale<`)
          );

          if (!createdSale) continue;

          if (createdSale.objectId !== saleId) continue;

          const createdCap = createdObjects.find((c) =>
            c.objectType?.includes("AdminCap<")
          );

          if (createdCap) {
            setAdminCapId(createdCap.objectId);
          } else {
            console.warn("⚠️ No AdminCap found in tx:", txDigest);
          }

          return; // Stop after finding the matching tx
        }

        console.warn("⚠️ No SaleLaunched event matched sale ID:", saleId);
      } catch (e) {
        console.error("❌ useAdminCap:", e);
      }
    };

    fetchCap();
  }, [saleId]);

  return adminCapId;
}
