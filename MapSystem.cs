using UnityEngine;

namespace GrandStrategy.Simple
{
    public static class MapSystem
    {
        public static void UpdateOccupationLogic(float deltaTime)
        {
            foreach (var prov in GameManager.Instance.AllProvinces.Values)
            {
                if (prov.ControllerTag != prov.OwnerTag && prov.ControlProgress > 0)
                {
                    // 进度推进
                    prov.ControlProgress += GameConst.OCCUPY_SPEED * deltaTime * (prov.HasSupply ? 1f : 0.3f);
                    
                    // 达到阈值完成攻占
                    if (prov.ControlProgress >= GameConst.OCCUPY_THRESHOLD)
                    {
                        prov.OwnerTag = prov.ControllerTag;
                        prov.ControlProgress = 1f;
                        Debug.Log($"【攻占成功】{prov.Name} 归属 {prov.ControllerTag}");
                    }
                }
            }
        }

        // 获取地块对应颜色
        public static Color GetProvinceColor(Province p)
        {
            if (p.ControllerTag == GameManager.Instance.PlayerTag)
                return GameConst.COLOR_OWNED;
            if (p.ControlProgress > 0 && p.ControllerTag != p.OwnerTag)
                return GameConst.COLOR_CONTESTED;
            if (p.OwnerTag != "NEUTRAL")
                return GameManager.Instance.AllCountries[p.OwnerTag].Color;
            return GameConst.COLOR_NEUTRAL;
        }
    }

    // 地块点击检测组件
    public class ProvinceClicker : MonoBehaviour
    {
        public int ProvinceId;
    }
}
