import { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = '201090999550'; // 01090999550 بصيغة دولية

// مفتاح Web3Forms: بيبعتلك نسخة من كل طلب على الإيميل تلقائيًا
const ORDER_EMAIL_ACCESS_KEY = '8c21278c-64eb-4a77-a292-131a285d2994';

const EMPTY_FORM = { name: '', phone: '', city: '', address: '', notes: '' };

function normalizePhone(value) {
  return value.replace(/[\s\-()]/g, '').replace(/^\+?20/, '0');
}

// بيبعت تفاصيل الطلب لإيميلك. مبيرميش إيرور: لو فشل بيرجّع 'failed' بس.
async function sendOrderEmail({ message, name, phone, total }) {
  if (!ORDER_EMAIL_ACCESS_KEY || ORDER_EMAIL_ACCESS_KEY.startsWith('PUT_')) {
    return 'off';
  }
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ORDER_EMAIL_ACCESS_KEY,
        subject: `طلب جديد من NOVI - ${name} - ${total.toLocaleString('en-EG')} EGP`,
        from_name: 'NOVI Website',
        name,
        phone,
        message,
      }),
    });
    const data = await res.json();
    return res.ok && data.success ? 'sent' : 'failed';
  } catch {
    return 'failed';
  }
}

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// حقل بعنوان بيطلع لفوق لما تكتب فيه، وعلامة صح لما القيمة تبقى سليمة
function Field({ id, label, value, onChange, error, valid, as: Tag = 'input', inputClass = '', ...rest }) {
  return (
    <div>
      <div className="relative">
        <Tag
          id={id}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full rounded-2xl border-2 bg-white px-4 pt-6 pb-2.5 text-base outline-none transition-colors ${
            error ? 'border-red-500' : 'border-ink/10 focus:border-ink'
          } ${Tag === 'textarea' ? 'resize-none' : ''} ${inputClass}`}
          {...rest}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute start-4 top-2 text-xs text-ink/55 transition-all duration-200 peer-[:placeholder-shown:not(:focus)]:top-4 peer-[:placeholder-shown:not(:focus)]:text-base peer-focus:text-ink"
        >
          {label}
        </label>
        {valid && (
          <span className="absolute end-4 top-4 w-6 h-6 rounded-full bg-ink text-paper grid place-items-center">
            {CHECK_ICON}
          </span>
        )}
      </div>
      {error && <p className="text-sm text-red-600 mt-1.5 px-1">{error}</p>}
    </div>
  );
}

function StepTitle({ n, children }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="w-8 h-8 rounded-full bg-ink text-paper grid place-items-center text-sm font-semibold">
        {n}
      </span>
      <h3 className="text-lg font-semibold">{children}</h3>
    </div>
  );
}

function CheckoutModal({ items, total, onClose, onComplete }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [whatsappUrl, setWhatsappUrl] = useState(null);
  const [emailStatus, setEmailStatus] = useState('sending'); // sending | sent | failed | off

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const isValid = {
    name: form.name.trim().length >= 3,
    phone: /^01[0125][0-9]{8}$/.test(normalizePhone(form.phone)),
    city: form.city.trim().length >= 2,
    address: form.address.trim().length >= 8,
  };

  const validate = () => {
    const next = {};
    if (!isValid.name) next.name = 'اكتب اسمك بالكامل';
    if (!isValid.phone) next.phone = 'اكتب رقم موبايل مصري صحيح (مثال: 01012345678)';
    if (!isValid.city) next.city = 'اكتب المحافظة / المدينة';
    if (!isValid.address) next.address = 'اكتب العنوان بالتفصيل';
    return next;
  };

  const buildMessage = () => {
    const lines = items.map(
      (item, i) =>
        `${i + 1}) ${item.name} - مقاس ${item.size} × ${item.qty} = ${(item.price * item.qty).toLocaleString('en-EG')} EGP`
    );

    return [
      'طلب جديد من موقع NOVI 🛍️',
      '',
      `الاسم: ${form.name.trim()}`,
      `الموبايل: ${normalizePhone(form.phone)}`,
      `المحافظة/المدينة: ${form.city.trim()}`,
      `العنوان: ${form.address.trim()}`,
      form.notes.trim() ? `ملاحظات: ${form.notes.trim()}` : null,
      '',
      'المنتجات:',
      ...lines,
      '',
      `الإجمالي: ${total.toLocaleString('en-EG')} EGP (غير شامل الشحن)`,
    ]
      .filter((line) => line !== null)
      .join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const message = buildMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // لازم نفتح واتساب فورًا من نفس الضغطة، وإلا المتصفح (خصوصًا آيفون) بيمنعه
    window.open(url, '_blank', 'noopener');
    setWhatsappUrl(url);
    setEmailStatus('sending');

    // بالتوازي بنبعت نسخة على الإيميل عشان الطلب يوصلك حتى لو العميل مبعتش على واتساب
    sendOrderEmail({
      message,
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      total,
    }).then(setEmailStatus);
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex items-end md:items-center justify-center md:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="إتمام الطلب"
    >
      <div
        className="sheet-in relative bg-paper w-full md:max-w-5xl max-h-[94dvh] md:max-h-[90vh] overflow-y-auto md:overflow-hidden rounded-t-[2rem] md:rounded-[2.5rem] md:flex"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-3 right-3 z-20 w-12 h-12 rounded-full bg-paper text-ink grid place-items-center hover:bg-ink hover:text-paper transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {whatsappUrl ? (
          <div className="w-full p-8 md:p-16 text-center flex flex-col items-center gap-5">
            <span className="w-24 h-24 rounded-full bg-ink text-paper grid place-items-center">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <path className="check-draw" d="M10 23L19 32L34 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="display text-4xl md:text-6xl">Order ready</h2>

            {emailStatus === 'sent' ? (
              <p dir="rtl" className="text-lg text-ink/70 leading-relaxed max-w-md">
                طلبك اتسجل عندنا. فتحنا واتساب كمان عشان نأكد معاك الشحن، اضغط إرسال هناك.
              </p>
            ) : emailStatus === 'sending' ? (
              <p dir="rtl" className="text-lg text-ink/70 leading-relaxed max-w-md">
                جاري تسجيل الطلب...
              </p>
            ) : (
              <p dir="rtl" className="text-lg text-ink/70 leading-relaxed max-w-md">
                فتحنا واتساب برسالة الطلب جاهزة. <strong>اضغط إرسال هناك</strong> عشان الطلب يوصلنا.
              </p>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm h-16 rounded-full bg-ink text-paper text-lg font-medium grid place-items-center hover:bg-neutral-800 active:scale-[0.99] transition"
            >
              Open WhatsApp again
            </a>
            <button
              type="button"
              onClick={onComplete}
              className="h-12 px-6 rounded-full text-base text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
            >
              تم الإرسال، فضّي السلة
            </button>
          </div>
        ) : (
          <>
            {/* ملخص الطلب على شكل إيصال */}
            <aside className="relative md:w-[40%] shrink-0 m-2 md:m-3 rounded-[1.75rem] md:rounded-[2rem] bg-ink text-paper p-6 md:p-8 overflow-hidden flex flex-col md:max-h-[calc(90vh-1.5rem)] md:overflow-y-auto">
              <h2 className="display-sm text-2xl mb-6 pr-12 md:pr-0">Your order</h2>

              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.cartKey} className="flex items-center gap-3">
                    <div
                      className="w-14 h-16 shrink-0 overflow-hidden rounded-xl"
                      style={{ backgroundColor: item.tint }}
                    >
                      <img src={item.front} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-paper/60">
                        Size {item.size}, qty {item.qty}
                      </p>
                    </div>
                    <p className="font-semibold tabular-nums">
                      {(item.price * item.qty).toLocaleString('en-EG')}
                    </p>
                  </li>
                ))}
              </ul>

              {/* خط الإيصال المنقّط مع الفتحتين على الجانبين */}
              <div className="relative my-7 border-t-2 border-dashed border-paper/25">
                <span className="absolute -left-9 md:-left-11 -top-[13px] w-6 h-6 rounded-full bg-paper" />
                <span className="absolute -right-9 md:-right-11 -top-[13px] w-6 h-6 rounded-full bg-paper" />
              </div>

              <div className="flex items-end justify-between gap-3">
                <span className="text-paper/60">Total</span>
                <span className="display text-5xl tabular-nums leading-none">
                  {total.toLocaleString('en-EG')}
                  <span className="ml-2 text-lg font-semibold tracking-normal">EGP</span>
                </span>
              </div>
              <p className="text-sm text-paper/50 mt-3">غير شامل الشحن</p>

              <p
                aria-hidden="true"
                className="display text-[22vw] md:text-[4rem] lg:text-[5rem] leading-none whitespace-nowrap text-paper/[0.07] select-none mt-6 -mb-4"
              >
                NOVI
              </p>
            </aside>

            <form
              dir="rtl"
              onSubmit={handleSubmit}
              noValidate
              className="flex-1 p-6 md:p-10 flex flex-col gap-4 md:overflow-y-auto md:max-h-[90vh]"
            >
              <div className="mb-2">
                <h2 dir="ltr" className="display text-4xl md:text-5xl text-right">
                  Almost yours
                </h2>
                <p className="text-ink/60 mt-3">كمّل بياناتك وهنأكد الطلب معاك على واتساب.</p>
              </div>

              <StepTitle n="1">بياناتك</StepTitle>
              <Field id="co-name" label="الاسم بالكامل" value={form.name} onChange={update('name')} error={errors.name} valid={isValid.name} autoComplete="name" />
              <Field id="co-phone" label="رقم الموبايل" value={form.phone} onChange={update('phone')} error={errors.phone} valid={isValid.phone} type="tel" inputMode="tel" autoComplete="tel" dir="ltr" inputClass="text-right" />

              <StepTitle n="2">التوصيل</StepTitle>
              <Field id="co-city" label="المحافظة / المدينة" value={form.city} onChange={update('city')} error={errors.city} valid={isValid.city} autoComplete="address-level2" />
              <Field id="co-address" as="textarea" rows={3} label="العنوان بالتفصيل (الشارع، العمارة، الدور)" value={form.address} onChange={update('address')} error={errors.address} valid={isValid.address} autoComplete="street-address" />
              <Field id="co-notes" as="textarea" rows={2} label="ملاحظات (اختياري)" value={form.notes} onChange={update('notes')} />

              <button
                type="submit"
                className="group mt-2 w-full h-16 rounded-full bg-ink text-paper flex items-center justify-between ps-8 pe-2 text-lg font-medium hover:bg-neutral-800 active:scale-[0.99] transition"
                style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
              >
                <span>أرسل الطلب</span>
                <span className="flex items-center gap-3 tabular-nums">
                  <span dir="ltr">{total.toLocaleString('en-EG')} EGP</span>
                  <span className="w-12 h-12 rounded-full bg-paper text-ink grid place-items-center group-hover:-translate-x-1 transition-transform">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M15 9H3M8 4L3 9L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
