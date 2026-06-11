using System.Collections.Generic;

namespace GrandStrategy.Simple
{
    [System.Serializable]
    public class Province
    {
        public int Id;
        public string Name;
        public List<int> Neighbors = new List<int>();
        public string OwnerTag;         // 原主人
        public string ControllerTag;    // 当前控制者
        public float ControlProgress;   // 攻占进度 0-1
        public bool HasSupply;          // 是否有补给
        public int Garrison;            // 驻军数量
        public Vector2 Position;        // 地图坐标
    }

    [System.Serializable]
    public class Country
    {
        public string Tag;
        public string Name;
        public Color Color;
        public List<int> Provinces = new List<int>();
        public int Manpower = 1000;
    }
}
