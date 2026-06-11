using UnityEngine;

namespace GrandStrategy.Simple
{
    public class UIManager : MonoBehaviour
    {
        public static UIManager Instance;
        private Province _current;

        void Awake() => Instance = this;

        void OnGUI()
        {
            DrawBackground();
            DrawTopBar();
            DrawSelectedInfo();
            DrawActionButtons();
        }

        void DrawBackground()
        {
            GUI.color = new Color(0.1f, 0.05f, 0.05f, 0.95f);
            GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), Texture2D.whiteTexture);
            GUI.color = Color.white;
        }

        void DrawTopBar()
        {
            GUI.color = GameConst.COLOR_TEXT;
            GUI.Label(new Rect(20, 15, 300, 30), "【烈焰升腾 - 简化大战略】", new GUIStyle { fontSize = 24, fontStyle = FontStyle.Bold });
            GUI.Label(new Rect(Screen.width - 220, 15, 200, 30), $"玩家人力: {GameManager.Instance.AllCountries["PLA"].Manpower}", new GUIStyle { fontSize = 18 });
        }

        public static void ShowProvinceInfo(Province p) => Instance._current = p;

        void DrawSelectedInfo()
        {
            if (_current == null) return;

            Rect panel = new Rect(20, Screen.height - 220, 320, 180);
            GUI.color = new Color(0.25f, 0.1f, 0.1f, 0.9f);
            GUI.DrawTexture(panel, Texture2D.whiteTexture);
            GUI.color = GameConst.COLOR_TEXT;

            float progress = _current.ControlProgress;
            string status = progress > 0 ? $"争夺中: {progress:P0}" : _current.ControllerTag;

            GUI.Label(new Rect(panel.x + 15, panel.y + 15, 290, 25), $"▷ {_current.Name}", new GUIStyle { fontSize = 20, fontStyle = FontStyle.Bold });
            GUI.Label(new Rect(panel.x + 15, panel.y + 45, 290, 20), $"当前控制: {status}");
            GUI.Label(new Rect(panel.x + 15, panel.y + 70, 290, 20), $"补给状态: {(_current.HasSupply ? "✅ 畅通" : "❌ 中断")}");
            GUI.Label(new Rect(panel.x + 15, panel.y + 95, 290, 20), $"驻军: {_current.Garrison}");

            // 进度条
            GUI.color = new Color(0.4f, 0.15f, 0.15f);
            GUI.DrawTexture(new Rect(panel.x + 15, panel.y + 125, 290, 15), Texture2D.whiteTexture);
            GUI.color = new Color(1f, 0.3f, 0.1f);
            GUI.DrawTexture(new Rect(panel.x + 15, panel.y + 125, 290 * progress, 15), Texture2D.whiteTexture);
        }

        void DrawActionButtons()
        {
            if (_current == null || _current.ControllerTag == GameManager.Instance.PlayerTag) return;

            GUI.color = new Color(0.8f, 0.2f, 0.2f);
            if (GUI.Button(new Rect(360, Screen.height - 80, 120, 35), "派遣50人"))
                GameManager.Instance.SendTroops(50);

            if (GUI.Button(new Rect(490, Screen.height - 80, 120, 35), "派遣100人"))
                GameManager.Instance.SendTroops(100);

            GUI.color = Color.white;
        }
    }
}
