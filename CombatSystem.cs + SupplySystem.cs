namespace GrandStrategy.Simple
{
    public static class CombatSystem
    {
        public static void AttackProvince(Province prov, string attackerTag, int attackForce)
        {
            if (prov.ControllerTag == attackerTag) return;

            // 简单攻防计算
            int defense = prov.Garrison + 50;
            float ratio = (float)attackForce / defense;

            if (ratio > 0.6f)
            {
                prov.ControllerTag = attackerTag;
                prov.ControlProgress = Mathf.Max(prov.ControlProgress, 0.2f);
                prov.Garrison = Mathf.Max(0, defense - attackForce / 2);
                Debug.Log($"【战斗开始】进攻 {prov.Name}，当前进度：{prov.ControlProgress:P0}");
            }
            else
            {
                Debug.Log("兵力不足，进攻失败");
            }
        }
    }

    public static class SupplySystem
    {
        public static void UpdateAllSupply()
        {
            foreach (var prov in GameManager.Instance.AllProvinces.Values)
            {
                prov.HasSupply = CheckSupplyPath(prov);

                if (!prov.HasSupply && prov.ControlProgress > 0)
                    prov.ControlProgress -= GameConst.SUPPLY_DRAIN * Time.deltaTime;
            }
        }

        // 简化版补给线检查（相邻己方地块即可）
        static bool CheckSupplyPath(Province prov)
        {
            if (prov.ControllerTag == GameManager.Instance.PlayerTag)
            {
                foreach (int nid in prov.Neighbors)
                {
                    if (GameManager.Instance.AllProvinces[nid].ControllerTag == prov.ControllerTag)
                        return true;
                }
            }
            return false;
        }
    }
}
