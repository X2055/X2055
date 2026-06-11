using UnityEngine;

namespace GrandStrategy.Simple
{
    public static class GameConst
    {
        // 核心规则
        public const float OCCUPY_SPEED = 0.1f;        // 基础攻占速度
        public const float OCCUPY_THRESHOLD = 0.7f;     // 攻占成功阈值
        public const float SUPPLY_DRAIN = 0.05f;        // 无补给损耗
        public const float SUPPLY_RECOVER = 0.03f;      // 有补给恢复

        // 颜色配置（烈焰升腾风格：红/黑/金/暗色调）
        public static readonly Color COLOR_NEUTRAL = new Color(0.3f, 0.3f, 0.3f);
        public static readonly Color COLOR_OWNED = new Color(0.8f, 0.2f, 0.2f);    // 赤红
        public static readonly Color COLOR_CONTESTED = new Color(1f, 0.6f, 0.1f);  // 橙黄
        public static readonly Color COLOR_OCCUPIED = new Color(0.6f, 0.1f, 0.1f); // 暗红
        public static readonly Color COLOR_TEXT = new Color(1f, 0.9f, 0.5f);       // 金色文字
    }
}
