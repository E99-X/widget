import { useEffect, useState } from "react";
const { SuiClient, getFullnodeUrl } = require("@mysten/sui/client");
const { SALEBOOK } = require("../constants/contract");

const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

export function useAdminCap(saleId, userAddress) {
  const [adminCapId, setAdminCapId] = useState(null);

  useEffect(() => {
    if (!userAddress || !saleId) {
      setAdminCapId(null);
      return;
    }

    async function fetchAdminCap() {
      try {
        const salesBookObj = await client.getObject({
          id: SALEBOOK,
          options: { showContent: true },
        });

        const outerTableId =
          salesBookObj?.data?.content?.fields?.sales?.fields?.id?.id;

        const usersArr = await client.getDynamicFields({
          parentId: outerTableId,
        });

        const userField = usersArr.data.find(
          (field) => field.name.value === userAddress
        );
        if (!userField) throw new Error("User not found in sales registry");

        const userTableObj = await client.getObject({
          id: userField.objectId,
          options: { showContent: true },
        });

        const userInnerTableId =
          userTableObj.data.content.fields.value.fields.id.id;

        const salesArr = await client.getDynamicFields({
          parentId: userInnerTableId,
        });

        const saleField = salesArr.data.find(
          (field) => field.name.value === saleId
        );
        if (!saleField) throw new Error("Sale not found for user");

        const saleDfieldId = saleField.objectId;
        const saleDfieldObj = await client.getObject({
          id: saleDfieldId,
          options: { showContent: true },
        });

        const adminCapId = saleDfieldObj.data.content.fields.value;
        setAdminCapId(adminCapId);
      } catch (e) {
        console.error("❌ Error fetching adminCap:", e.message);
        setAdminCapId(null);
      }
    }

    fetchAdminCap();
  }, [userAddress, saleId]);

  return { adminCapId };
}
