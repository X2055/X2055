using UnityEngine;
using System.Collections.Generic;

namespace GrandStrategy.Simple
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;

        public Dictionary<int, Province> AllProvinces = new Dictionary<int, Province>();
        public Dictionary<string, Country> AllCountries = new Dictionary<string, Country>();
        public Province SelectedProvince;
        public string PlayerTag = "PLA";

        void Awake()
        {
            Instance = this;
            InitTestData();
        }

        void Update()
        {
            if (Input.GetMouseButtonDown(0))
                CheckClick();

            MapSystem.UpdateOccupationLogic(Time.deltaTime);
            SupplySystem.UpdateAllSupply();
        }

        // 初始化测试地图数据
        void InitTestData()
        {
            // 国家
            AllCountries["PLA"] = new Country { Tag = "PLA", Name = "玩家阵营", Color = GameConst.COLOR_OWNED };
            AllCountries["ENEMY"] = new Country { Tag = "ENEMY", Name = "敌对势力", Color = new Color(0.2f, 0.2f, 0.8f) };

            // 地块
            AllProvinces[1] = new Province { Id = 1, Name = "边境省", OwnerTag = "PLA", ControllerTag = "PLA", Position = new Vector2(-2, 0) };
            AllProvinces[2] = new Province { Id = 2, Name = "前线省", OwnerTag = "ENEMY", ControllerTag = "ENEMY", Position = new Vector2(0, 0) };
            AllProvinces[3] = new Province { Id = 3, Name = "核心省", OwnerTag = "ENEMY", ControllerTag = "ENEMY", Position = new Vector2(2, 0) };
            
            AllProvinces[1].Neighbors.Add(2);
            AllProvinces[2].Neighbors.Add(1); AllProvinces[2].Neighbors.Add(3);
            AllProvinces[3].Neighbors.Add(2);
        }

        void CheckClick()
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out RaycastHit hit))
            {
                if (hit.collider.TryGetComponent(out ProvinceClicker clicker))
                {
                    SelectedProvince = AllProvinces[clicker.ProvinceId];
                    UIManager.ShowProvinceInfo(SelectedProvince);
                }
            }
        }

        // 派遣部队攻占
        public void SendTroops(int amount)
        {
            if (SelectedProvince == null || SelectedProvince.ControllerTag == PlayerTag) return;
            if (AllCountries[PlayerTag].Manpower < amount) return;

            AllCountries[PlayerTag].Manpower -= amount;
            CombatSystem.AttackProvince(SelectedProvince, PlayerTag, amount);
        }
    }
}
