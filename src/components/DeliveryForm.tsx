"use client";

import { DeliveryData, DeliveryItem } from "@/types/delivery";

interface Props {
  data: DeliveryData;
  onChange: (data: DeliveryData) => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
      <span className="w-1 h-4 bg-green-500 rounded-full" />
      {children}
    </h3>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-gray-500 mb-1 block">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-gray-300 focus:border-green-500";

export default function DeliveryForm({ data, onChange }: Props) {
  const update = <K extends keyof DeliveryData>(key: K, value: DeliveryData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const updateItem = (index: number, field: keyof DeliveryItem, value: string | number) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: String(Date.now()),
          name: "",
          quantity: 1,
          unit: "式",
          unitPrice: 0,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    if (data.items.length <= 1) return;
    onChange({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      {/* 納品情報 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <SectionTitle>納品情報</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="納品書番号">
            <input
              type="text"
              className={inputClass}
              placeholder="DLV-2026-001"
              value={data.deliveryNumber}
              onChange={(e) => update("deliveryNumber", e.target.value)}
            />
          </Field>
          <Field label="件名">
            <input
              type="text"
              className={inputClass}
              placeholder="Webサイト制作"
              value={data.subject}
              onChange={(e) => update("subject", e.target.value)}
            />
          </Field>
          <Field label="発行日">
            <input
              type="date"
              className={inputClass}
              value={data.deliveryDate}
              onChange={(e) => update("deliveryDate", e.target.value)}
            />
          </Field>
          <Field label="納品日">
            <input
              type="date"
              className={inputClass}
              value={data.deliveryDueDate}
              onChange={(e) => update("deliveryDueDate", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 宛先 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <SectionTitle>宛先</SectionTitle>
        <div className="grid grid-cols-[1fr_80px] gap-3">
          <Field label="会社名・氏名">
            <input
              type="text"
              className={inputClass}
              placeholder="株式会社サンプル"
              value={data.clientName}
              onChange={(e) => update("clientName", e.target.value)}
            />
          </Field>
          <Field label="敬称">
            <select
              className={inputClass}
              value={data.clientTitle}
              onChange={(e) => update("clientTitle", e.target.value)}
            >
              <option value="御中">御中</option>
              <option value="様">様</option>
            </select>
          </Field>
        </div>
      </section>

      {/* 自社情報 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <SectionTitle>自社情報</SectionTitle>
        <div className="space-y-3">
          <Field label="会社名">
            <input
              type="text"
              className={inputClass}
              placeholder="自社名"
              value={data.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="郵便番号">
              <input
                type="text"
                className={inputClass}
                placeholder="000-0000"
                value={data.companyZip}
                onChange={(e) => update("companyZip", e.target.value)}
              />
            </Field>
            <Field label="電話番号">
              <input
                type="text"
                className={inputClass}
                placeholder="03-0000-0000"
                value={data.companyTel}
                onChange={(e) => update("companyTel", e.target.value)}
              />
            </Field>
          </div>
          <Field label="住所">
            <input
              type="text"
              className={inputClass}
              placeholder="東京都渋谷区..."
              value={data.companyAddress}
              onChange={(e) => update("companyAddress", e.target.value)}
            />
          </Field>
          <Field label="メールアドレス">
            <input
              type="email"
              className={inputClass}
              placeholder="info@example.com"
              value={data.companyEmail}
              onChange={(e) => update("companyEmail", e.target.value)}
            />
          </Field>
          <Field label="登録番号（インボイス）">
            <input
              type="text"
              className={inputClass}
              placeholder="T1234567890123"
              value={data.companyRegistrationNumber}
              onChange={(e) => update("companyRegistrationNumber", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 明細 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <SectionTitle>明細</SectionTitle>
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="relative rounded-xl border border-gray-100 bg-gray-50/50 p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-400">
                  #{index + 1}
                </span>
                {data.items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="text-gray-400 hover:text-red-500 text-xs transition-colors"
                  >
                    削除
                  </button>
                )}
              </div>
              <Field label="品目" className="mb-2">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="品目名"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-3 gap-2">
                <Field label="数量">
                  <input
                    type="number"
                    className={inputClass}
                    min="0"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", Number(e.target.value))
                    }
                  />
                </Field>
                <Field label="単位">
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="式"
                    value={item.unit}
                    onChange={(e) => updateItem(index, "unit", e.target.value)}
                  />
                </Field>
                <Field label="単価">
                  <input
                    type="number"
                    className={inputClass}
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(index, "unitPrice", Number(e.target.value))
                    }
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
          >
            + 明細を追加
          </button>
        </div>

        {/* 税率 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Field label="消費税率（%）">
            <select
              className={inputClass + " w-32"}
              value={data.taxRate}
              onChange={(e) => update("taxRate", Number(e.target.value))}
            >
              <option value={10}>10%</option>
              <option value={8}>8%（軽減税率）</option>
              <option value={0}>なし</option>
            </select>
          </Field>
        </div>
      </section>

      {/* 備考 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <SectionTitle>備考</SectionTitle>
        <textarea
          className={inputClass + " min-h-[80px] resize-y"}
          placeholder="ご不明な点がございましたらお気軽にお問い合わせください。"
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </section>
    </div>
  );
}
